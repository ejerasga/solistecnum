"""
Solis Tectum Solar Installation — Flask Backend
================================================
A clean, modular Flask application powering the landing page,
AI chatbot endpoint, and contact-form lead capture.

Run:  python app.py
"""

from flask import Flask, render_template, request, jsonify
import html
import os
import re
import smtplib
from datetime import datetime
from email.message import EmailMessage

import requests

app = Flask(__name__)

# ──────────────────────────────────────────────
# Email configuration (set these as environment variables on Render)
# ──────────────────────────────────────────────
# Where contact-form inquiries are delivered.
CONTACT_RECIPIENT = os.environ.get("CONTACT_RECIPIENT", "ejerasga12@gmail.com")

# Option A (recommended on Render — works on the free plan, uses HTTPS):
#   RESEND_API_KEY  -> API key from https://resend.com
#   RESEND_FROM     -> sender; "onboarding@resend.dev" works without a domain
#                      as long as the Resend account is registered to CONTACT_RECIPIENT.
RESEND_API_KEY = os.environ.get("RESEND_API_KEY", "").strip()
RESEND_FROM = os.environ.get("RESEND_FROM", "Solis Tectum Website <onboarding@resend.dev>")

# Option B (SMTP, e.g. Gmail + App Password). NOTE: Render's free plan blocks
# outbound SMTP ports 25/465/587, so use this only locally or on a paid instance.
SMTP_HOST = os.environ.get("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.environ.get("SMTP_PORT", "587"))
SMTP_USER = os.environ.get("SMTP_USER", "").strip()
SMTP_PASSWORD = os.environ.get("SMTP_PASSWORD", "").replace(" ", "")


def log(msg):
    """Print to the server log without crashing on consoles that can't show ₱ / emoji."""
    try:
        print(msg, flush=True)
    except UnicodeEncodeError:
        print(msg.encode("ascii", "backslashreplace").decode("ascii"), flush=True)


def _build_lead_email(name, contact_info, monthly_bill, message):
    """Return (subject, plain_text, html_body) for a lead notification."""
    subject = f"☀️ New Solis Tectum Inquiry from {name}"
    submitted = datetime.now().strftime("%B %d, %Y %I:%M %p")
    rows = [
        ("Client Name", name),
        ("Phone / Email", contact_info),
        ("Average Monthly Bill", f"₱{monthly_bill}"),
        ("Message / Project Details", message or "No additional message"),
        ("Submitted", submitted),
    ]
    text = "New inquiry from the Solis Tectum website\n\n" + "\n".join(
        f"{label}: {value}" for label, value in rows
    )
    html_rows = "".join(
        f"<tr><td style='padding:8px 12px;border:1px solid #ddd;font-weight:bold;'>{html.escape(label)}</td>"
        f"<td style='padding:8px 12px;border:1px solid #ddd;white-space:pre-wrap;'>{html.escape(value)}</td></tr>"
        for label, value in rows
    )
    html_body = (
        "<h2 style='font-family:Arial,sans-serif;'>New inquiry from the Solis Tectum website</h2>"
        f"<table style='border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px;'>{html_rows}</table>"
    )
    return subject, text, html_body


def send_lead_email(name, contact_info, monthly_bill, message):
    """
    Email a lead to CONTACT_RECIPIENT.
    Returns True if sent, False if it failed or no email provider is configured.
    """
    subject, text, html_body = _build_lead_email(name, contact_info, monthly_bill, message)
    reply_to = contact_info if "@" in contact_info else None

    if RESEND_API_KEY:
        payload = {
            "from": RESEND_FROM,
            "to": [CONTACT_RECIPIENT],
            "subject": subject,
            "text": text,
            "html": html_body,
        }
        if reply_to:
            payload["reply_to"] = reply_to
        try:
            resp = requests.post(
                "https://api.resend.com/emails",
                json=payload,
                headers={
                    "Authorization": f"Bearer {RESEND_API_KEY}",
                    "User-Agent": "solis-tectum-website/1.0",
                },
                timeout=15,
            )
            if resp.ok:
                return True
            log(f"[EMAIL ERROR] Resend {resp.status_code}: {resp.text}")
        except requests.RequestException as exc:
            log(f"[EMAIL ERROR] Resend request failed: {exc}")
        return False

    if SMTP_USER and SMTP_PASSWORD:
        msg = EmailMessage()
        msg["Subject"] = subject
        msg["From"] = SMTP_USER
        msg["To"] = CONTACT_RECIPIENT
        if reply_to:
            msg["Reply-To"] = reply_to
        msg.set_content(text)
        msg.add_alternative(html_body, subtype="html")
        try:
            if SMTP_PORT == 465:
                with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, timeout=15) as server:
                    server.login(SMTP_USER, SMTP_PASSWORD)
                    server.send_message(msg)
            else:
                with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=15) as server:
                    server.starttls()
                    server.login(SMTP_USER, SMTP_PASSWORD)
                    server.send_message(msg)
            return True
        except (smtplib.SMTPException, OSError) as exc:
            log(f"[EMAIL ERROR] SMTP send failed: {exc}")
        return False

    log("[EMAIL] No email provider configured (set RESEND_API_KEY or SMTP_USER/SMTP_PASSWORD).")
    return False

# ──────────────────────────────────────────────
# Knowledge base for the solar inquiry chatbot
# ──────────────────────────────────────────────
CHATBOT_KB = [
    {
        "keywords": ["price", "cost", "how much", "pricing", "afford", "expensive", "cheap", "budget"],
        "response": (
            "Great question! The cost of a solar installation depends on your roof size, "
            "energy consumption, and system type. A typical **3–5 kW residential system** "
            "in the Philippines ranges from ₱180,000 to ₱350,000. We offer flexible financing "
            "options too. Would you like a **free customized quote**? Just share your average "
            "monthly electric bill!"
        ),
    },
    {
        "keywords": ["quote", "estimate", "free quote", "quotation"],
        "response": (
            "We'd love to prepare a free, no-obligation quote for you! To get started, "
            "please share:\n• Your **average monthly electric bill** (in ₱)\n"
            "• Your **location / city**\n• Your **roof type** (concrete, metal, tile)\n\n"
            "Or simply fill out the contact form below and our engineers will reach out within 24 hours."
        ),
    },
    {
        "keywords": ["bill", "save", "saving", "electric", "electricity", "savings"],
        "response": (
            "Most of our clients see a **40–70% reduction** in their monthly electric bills "
            "after switching to solar! For example, if you currently pay ₱8,000/month, a properly "
            "sized system can bring that down to ₱2,500–₱4,800 depending on daytime usage and system capacity."
        ),
    },
    {
        "keywords": ["durability", "quality", "lifespan", "how long", "materials", "components"],
        "response": (
            "We engineer our systems with top-grade **Tier-1 monocrystalline panels**, "
            "corrosion-resistant anodized aluminum mounting fixtures, and proven smart inverters. "
            "Our focus is structural integrity, leak-proof rooftop installation, and reliable daily clean power."
        ),
    },
    {
        "keywords": ["off-grid", "off grid", "grid tied", "grid-tied", "hybrid", "types", "system type"],
        "response": (
            "We offer **Grid-Tied**, **Hybrid Energy Storage**, and **Off-Grid Independent** solar installations. "
            "Grid-tied systems maximize daytime power bill reduction, while hybrid systems provide seamless battery "
            "backup during grid outages or brownouts."
        ),
    },
    {
        "keywords": ["inspection", "site visit", "survey", "assess", "visit"],
        "response": (
            "We offer **free site inspections** across Metro Manila and nearby provinces! "
            "Our certified engineers will assess your roof structure, shading, orientation, "
            "and electrical setup. Inspections usually take 1–2 hours. Would you like to "
            "book one? Just drop your address and preferred schedule!"
        ),
    },
    {
        "keywords": ["install", "installation", "how long", "timeline", "duration", "days"],
        "response": (
            "A standard residential installation takes **1–3 days** depending on system size "
            "and roof complexity. Here's our typical timeline:\n"
            "1. **Site Inspection** → 1–2 hours\n"
            "2. **System Design & Proposal** → 2–3 days\n"
            "3. **Installation & Commissioning** → 1–3 days\n\n"
            "We keep you informed every step of the way."
        ),
    },
    {
        "keywords": ["panel", "panels", "module", "brand", "type", "monocrystalline", "polycrystalline"],
        "response": (
            "We use **Tier-1 monocrystalline solar panels** from trusted global brands like "
            "LONGi, JA Solar, Canadian Solar, and Trina Solar. These panels offer the best "
            "efficiency (20–22%) and long-term reliability. We'll recommend the best option "
            "based on your roof space and budget."
        ),
    },
    {
        "keywords": ["hybrid", "battery", "storage", "backup", "blackout", "power outage"],
        "response": (
            "Our **Hybrid Energy Storage Solutions** combine solar panels with battery backup, "
            "so you have power even during grid outages. Popular options include:\n"
            "• **5 kWh lithium battery** — covers essential loads for 4–6 hours\n"
            "• **10 kWh system** — whole-home backup\n\n"
            "Hybrid systems also maximize self-consumption, reducing your grid dependence further."
        ),
    },
    {
        "keywords": ["maintenance", "cleaning", "service", "repair", "maintain"],
        "response": (
            "Solar panels require minimal maintenance! We recommend:\n"
            "• **Quarterly cleaning** to remove dust and debris\n"
            "• **Annual system inspection** to check connections and performance\n\n"
            "Solis Tectum offers affordable **Preventative Maintenance Plans** starting at "
            "₱2,500/visit. We also provide 24/7 monitoring support for hybrid systems."
        ),
    },
    {
        "keywords": ["hello", "hi", "hey", "good morning", "good afternoon", "good evening"],
        "response": (
            "Hello! ☀️ Welcome to **Solis Tectum Solar Installation**. I'm your solar assistant "
            "and I'm here to help you with anything — from pricing and savings estimates to "
            "booking a free site inspection. What would you like to know?"
        ),
    },
    {
        "keywords": ["thank", "thanks", "salamat"],
        "response": (
            "You're welcome! ☀️ If you have any more questions about going solar, feel free "
            "to ask anytime. We're here to help you make the best energy decision for your home."
        ),
    },
    {
        "keywords": ["financing", "loan", "installment", "payment plan", "pay monthly"],
        "response": (
            "Yes! We offer **flexible financing options** to make solar accessible:\n"
            "• **0% interest installment** plans up to 12 months\n"
            "• **Bank financing** partnerships with BDO, BPI, and Security Bank\n"
            "• **Cash discounts** for upfront payments\n\n"
            "Most systems pay for themselves within 4–6 years through electricity savings!"
        ),
    },
]

DEFAULT_RESPONSE = (
    "Thanks for your question! I'd love to help. For the most accurate answer, "
    "I recommend speaking with one of our solar consultants. You can:\n\n"
    "• Fill out the **contact form** below\n"
    "• Call us directly at **09763476557**\n"
    "• Message us on **Facebook** or **Viber (09654073894)**\n\n"
    "Is there anything else about solar energy I can help with?"
)


def match_response(user_message: str) -> str:
    """Match user message against the knowledge base and return the best response."""
    msg_lower = user_message.lower().strip()

    best_match = None
    best_score = 0

    for entry in CHATBOT_KB:
        score = sum(1 for kw in entry["keywords"] if kw in msg_lower)
        if score > best_score:
            best_score = score
            best_match = entry

    if best_match and best_score > 0:
        return best_match["response"]

    return DEFAULT_RESPONSE


# ──────────────────────────────────────────────
# Routes
# ──────────────────────────────────────────────

@app.route("/")
def index():
    """Render the main landing page."""
    return render_template("index.html")


@app.route("/api/chat", methods=["POST"])
def chat():
    """Handle chatbot messages and return intelligent responses."""
    data = request.get_json(silent=True)

    if not data or not data.get("message", "").strip():
        return jsonify({"error": "Message is required."}), 400

    user_message = data["message"].strip()
    bot_response = match_response(user_message)

    return jsonify({
        "reply": bot_response,
        "timestamp": datetime.now().isoformat(),
    })


@app.route("/api/contact", methods=["POST"])
def contact():
    """Validate and process contact form submissions."""
    data = request.get_json(silent=True)

    if not data:
        return jsonify({"error": "No data provided."}), 400

    # Extract fields
    name = data.get("name", "").strip()
    contact_info = data.get("contact", "").strip()  # phone or email
    monthly_bill = data.get("monthly_bill", "").strip()
    message = data.get("message", "").strip()

    # Validation
    errors = []
    if not name or len(name) < 2:
        errors.append("Please provide your full name.")
    if not contact_info:
        errors.append("Please provide a phone number or email address.")
    else:
        # Basic email or phone validation
        is_email = re.match(r"[^@\s]+@[^@\s]+\.[^@\s]+", contact_info)
        is_phone = re.match(r"^[\d\s\-\+\(\)]{7,15}$", contact_info)
        if not is_email and not is_phone:
            errors.append("Please provide a valid email or phone number.")
    if not monthly_bill:
        errors.append("Please provide your average monthly electric bill.")

    if errors:
        return jsonify({"success": False, "errors": errors}), 422

    # Always log the lead (visible in Render's "Logs" tab) so nothing is lost.
    log(f"[LEAD] {datetime.now().isoformat()} | {name} | {contact_info} | ₱{monthly_bill} | {message}")

    email_sent = send_lead_email(name, contact_info, monthly_bill, message)

    return jsonify({
        "success": True,
        "email_sent": email_sent,
        "message": (
            f"Thank you, {name}! Your inquiry has been received. "
            "Our solar consultants will contact you within 24 hours."
        ),
    })


# ──────────────────────────────────────────────
# Run
# ──────────────────────────────────────────────
if __name__ == "__main__":
    # Local development only. On Render the app is served by gunicorn (see render.yaml).
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))

