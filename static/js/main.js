/**
 * Solis Tectum Solar Installation — Main JavaScript
 * ==================================================
 * Handles navigation, smooth scrolling, animations,
 * FAQ accordion, gallery interactions, and contact form.
 */

document.addEventListener("DOMContentLoaded", () => {
  // ─── Project Portfolio Modal & Photo Gallery ───
  const projectModal = document.getElementById("project-modal");
  const modalBackdrop = document.getElementById("modal-backdrop");
  const modalCloseBtn = document.getElementById("modal-close");
  const modalTitle = document.getElementById("modal-title");
  const modalLocation = document.getElementById("modal-location");
  const modalDescription = document.getElementById("modal-description");
  const modalCapacityBadge = document.getElementById("modal-capacity-badge");
  const modalSpecs = document.getElementById("modal-specs");
  const modalMainImage = document.getElementById("modal-main-image");
  const modalThumbnails = document.getElementById("modal-thumbnails");
  const modalQuoteBtn = document.getElementById("modal-quote-btn");

  // Comprehensive projects data dictionary with collections of photos and specs
  const projectDetailsData = {
    p1: {
      title: "5.5kW Hybrid Energy Storage Setup",
      location: "📍 Quezon City, Metro Manila",
      capacity: "5.5 kW System",
      description: "An engineered rooftop installation designed for a 2-storey residence. Equipped with Tier-1 550W monocrystalline modules paired with a low-voltage lithium battery bank, keeping air conditioners and refrigerators running even during grid outages.",
      specs: [
        { label: "Solar Array", value: "10x 550W Tier-1 Mono" },
        { label: "Inverter", value: "5kW Hybrid Smart Inverter" },
        { label: "Storage", value: "5.12kWh LiFePO4 Battery" },
        { label: "Roof Type", value: "Concrete Flat Roof + Racking" },
        { label: "Est. Savings", value: "₱5,000 – ₱7,500 / mo" },
        { label: "Daily Output", value: "22 – 26 kWh / day" }
      ],
      photos: [
        {
          title: "Rooftop Layout",
          svg: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
            <defs><linearGradient id="g1-1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#1e3a8a"/><stop offset="100%" stop-color="#0f172a"/></linearGradient></defs>
            <rect width="400" height="300" fill="#0f172a"/>
            <polygon points="50,250 200,120 350,250" fill="#334155"/>
            <polygon points="80,230 200,140 320,230" fill="url(#g1-1)" stroke="#38bdf8" stroke-width="2"/>
            <line x1="140" y1="185" x2="260" y2="185" stroke="#38bdf8" stroke-width="1.5"/>
            <line x1="200" y1="140" x2="200" y2="230" stroke="#38bdf8" stroke-width="1.5"/>
            <circle cx="330" cy="70" r="26" fill="#F59E0B" opacity="0.9"/>
            <text x="200" y="280" text-anchor="middle" fill="#94a3b8" font-size="12" font-family="Inter">Rooftop Solar Array View</text>
          </svg>`
        },
        {
          title: "Inverter & Battery",
          svg: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="300" fill="#1e293b"/>
            <!-- Inverter Unit -->
            <rect x="70" y="60" width="110" height="150" rx="8" fill="#0f172a" stroke="#F59E0B" stroke-width="2"/>
            <circle cx="125" cy="110" r="24" fill="#0284c7" opacity="0.3"/>
            <circle cx="125" cy="110" r="16" fill="#38bdf8"/>
            <rect x="90" y="150" width="70" height="12" rx="3" fill="#334155"/>
            <text x="125" y="195" text-anchor="middle" fill="#f8fafc" font-size="11" font-weight="bold" font-family="Inter">Hybrid Inverter</text>
            <!-- Battery Unit -->
            <rect x="220" y="60" width="110" height="150" rx="8" fill="#0f172a" stroke="#22c55e" stroke-width="2"/>
            <rect x="240" y="90" width="70" height="10" rx="2" fill="#22c55e"/>
            <rect x="240" y="110" width="70" height="10" rx="2" fill="#22c55e"/>
            <rect x="240" y="130" width="70" height="10" rx="2" fill="#22c55e"/>
            <rect x="240" y="150" width="70" height="10" rx="2" fill="#334155"/>
            <text x="275" y="195" text-anchor="middle" fill="#f8fafc" font-size="11" font-weight="bold" font-family="Inter">LiFePO4 5.12kWh</text>
            <text x="200" y="270" text-anchor="middle" fill="#94a3b8" font-size="12" font-family="Inter">Engineered Power Wall Station</text>
          </svg>`
        },
        {
          title: "Mounting & Wiring",
          svg: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="300" fill="#090d16"/>
            <!-- Aluminum Racking -->
            <line x1="40" y1="100" x2="360" y2="100" stroke="#94a3b8" stroke-width="6"/>
            <line x1="40" y1="180" x2="360" y2="180" stroke="#94a3b8" stroke-width="6"/>
            <line x1="100" y1="80" x2="100" y2="200" stroke="#cbd5e1" stroke-width="4"/>
            <line x1="200" y1="80" x2="200" y2="200" stroke="#cbd5e1" stroke-width="4"/>
            <line x1="300" y1="80" x2="300" y2="200" stroke="#cbd5e1" stroke-width="4"/>
            <!-- Solar Clamps -->
            <circle cx="100" cy="100" r="8" fill="#F59E0B"/>
            <circle cx="200" cy="100" r="8" fill="#F59E0B"/>
            <circle cx="300" cy="100" r="8" fill="#F59E0B"/>
            <circle cx="100" cy="180" r="8" fill="#F59E0B"/>
            <circle cx="200" cy="180" r="8" fill="#F59E0B"/>
            <circle cx="300" cy="180" r="8" fill="#F59E0B"/>
            <text x="200" y="260" text-anchor="middle" fill="#94a3b8" font-size="12" font-family="Inter">Leak-Proof Anodized Aluminum Fixtures</text>
          </svg>`
        }
      ]
    },
    p2: {
      title: "10kW Grid-Tied Commercial System",
      location: "📍 Makati City, Metro Manila",
      capacity: "10 kW System",
      description: "A commercial-scale installation engineered for peak daytime energy demand. Designed directly on standing-seam metal decking with zero roof penetration to safeguard your roofing structure.",
      specs: [
        { label: "Solar Array", value: "18x 560W Bifacial Modules" },
        { label: "Inverter", value: "10kW Three-Phase Inverter" },
        { label: "Roof Type", value: "Standing-Seam Metal Deck" },
        { label: "Est. Savings", value: "₱11,000 – ₱16,000 / mo" },
        { label: "Daily Output", value: "42 – 50 kWh / day" },
        { label: "Monitoring", value: "24/7 Mobile Cloud Dashboard" }
      ],
      photos: [
        {
          title: "Metal Roof Layout",
          svg: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="300" fill="#111827"/>
            <polygon points="20,260 380,260 350,130 50,130" fill="#1f2937"/>
            <rect x="70" y="145" width="120" height="95" fill="#0284c7" stroke="#7dd3fc" stroke-width="2"/>
            <rect x="210" y="145" width="120" height="95" fill="#0284c7" stroke="#7dd3fc" stroke-width="2"/>
            <circle cx="70" cy="60" r="24" fill="#F59E0B" opacity="0.9"/>
            <text x="200" y="285" text-anchor="middle" fill="#94a3b8" font-size="12" font-family="Inter">Dual String Commercial Array</text>
          </svg>`
        },
        {
          title: "Industrial Inverter",
          svg: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="300" fill="#0b0f19"/>
            <rect x="120" y="50" width="160" height="180" rx="10" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
            <rect x="145" y="80" width="110" height="40" rx="4" fill="#0284c7" opacity="0.2"/>
            <text x="200" y="105" text-anchor="middle" fill="#38bdf8" font-size="13" font-family="Space Grotesk">10,250 W</text>
            <circle cx="155" cy="170" r="8" fill="#22c55e"/>
            <circle cx="185" cy="170" r="8" fill="#22c55e"/>
            <circle cx="215" cy="170" r="8" fill="#22c55e"/>
            <circle cx="245" cy="170" r="8" fill="#F59E0B"/>
            <text x="200" y="270" text-anchor="middle" fill="#94a3b8" font-size="12" font-family="Inter">Three-Phase Grid Inverter</text>
          </svg>`
        },
        {
          title: "Non-Penetrating Clamps",
          svg: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="300" fill="#111827"/>
            <path d="M50 200 L120 120 L280 120 L350 200 Z" fill="#374151"/>
            <rect x="150" y="90" width="100" height="50" rx="4" fill="#F59E0B" stroke="#b45309" stroke-width="2"/>
            <line x1="170" y1="140" x2="170" y2="180" stroke="#cbd5e1" stroke-width="4"/>
            <line x1="230" y1="140" x2="230" y2="180" stroke="#cbd5e1" stroke-width="4"/>
            <text x="200" y="260" text-anchor="middle" fill="#94a3b8" font-size="12" font-family="Inter">S-5! Seam Clamps (Zero Holes)</text>
          </svg>`
        }
      ]
    },
    p3: {
      title: "3.3kW Residential Starter System",
      location: "📍 Antipolo, Rizal",
      capacity: "3.3 kW System",
      description: "The ideal starter setup for small to medium households aiming to cut down daytime electricity bills with minimal upfront investment.",
      specs: [
        { label: "Solar Array", value: "6x 550W Tier-1 Mono" },
        { label: "Inverter", value: "3.3kW On-Grid String Inverter" },
        { label: "Roof Type", value: "Clay / Concrete Tile" },
        { label: "Est. Savings", value: "₱3,500 – ₱5,000 / mo" },
        { label: "Daily Output", value: "14 – 16 kWh / day" }
      ],
      photos: [
        {
          title: "Tile Roof Layout",
          svg: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="300" fill="#090d16"/>
            <polygon points="60,260 200,110 340,260" fill="#475569"/>
            <polygon points="90,240 200,130 310,240" fill="#1d4ed8" stroke="#60a5fa" stroke-width="2"/>
            <circle cx="340" cy="50" r="22" fill="#F59E0B" opacity="0.9"/>
            <text x="200" y="285" text-anchor="middle" fill="#94a3b8" font-size="12" font-family="Inter">Pitched Tile Roof Fitment</text>
          </svg>`
        },
        {
          title: "Compact Inverter",
          svg: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="300" fill="#1e293b"/>
            <rect x="135" y="60" width="130" height="160" rx="8" fill="#0f172a" stroke="#F59E0B" stroke-width="2"/>
            <circle cx="200" cy="120" r="24" fill="#38bdf8"/>
            <text x="200" y="190" text-anchor="middle" fill="#f8fafc" font-size="12" font-family="Inter">Single Phase 3.3kW</text>
            <text x="200" y="260" text-anchor="middle" fill="#94a3b8" font-size="12" font-family="Inter">Compact Wall Mount</text>
          </svg>`
        }
      ]
    },
    p4: {
      title: "8kW Hybrid Whole-Home System",
      location: "📍 San Fernando, Pampanga",
      capacity: "8 kW System",
      description: "Engineered whole-home solar plus backup system. Seamless auto-transfer during grid power blackouts keeps lights, Wi-Fi, refrigerators, and 2 split-type AC units powered uninterrupted.",
      specs: [
        { label: "Solar Array", value: "15x 550W Tier-1 Mono" },
        { label: "Inverter", value: "8kW Hybrid Low-Voltage Inverter" },
        { label: "Battery Bank", value: "10.24kWh Lithium LiFePO4" },
        { label: "Roof Type", value: "Concrete Slab with Elevated Strut" },
        { label: "Est. Savings", value: "₱8,000 – ₱12,000 / mo" }
      ],
      photos: [
        {
          title: "Elevated Solar Racking",
          svg: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="300" fill="#0f172a"/>
            <polygon points="30,250 200,130 370,250" fill="#334155"/>
            <polygon points="60,235 200,145 340,235" fill="#0284c7" stroke="#38bdf8" stroke-width="2"/>
            <circle cx="70" cy="50" r="26" fill="#F59E0B" opacity="0.8"/>
            <text x="200" y="280" text-anchor="middle" fill="#94a3b8" font-size="12" font-family="Inter">Elevated Canopy Racking</text>
          </svg>`
        },
        {
          title: "Dual Lithium Power Rack",
          svg: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="300" fill="#1e293b"/>
            <rect x="80" y="50" width="100" height="170" rx="6" fill="#0f172a" stroke="#22c55e" stroke-width="2"/>
            <rect x="220" y="50" width="100" height="170" rx="6" fill="#0f172a" stroke="#22c55e" stroke-width="2"/>
            <text x="130" y="140" text-anchor="middle" fill="#22c55e" font-size="12" font-weight="bold">5.12 kWh</text>
            <text x="270" y="140" text-anchor="middle" fill="#22c55e" font-size="12" font-weight="bold">5.12 kWh</text>
            <text x="200" y="260" text-anchor="middle" fill="#94a3b8" font-size="12" font-family="Inter">Parallel 10.24kWh Battery Bank</text>
          </svg>`
        }
      ]
    },
    p5: {
      title: "15kW Commercial Warehouse Rooftop",
      location: "📍 Cebu City, Cebu",
      capacity: "15 kW System",
      description: "Commercial grid-tied system engineered for high daytime operational loads, reducing warehouse refrigeration and machinery operational costs by over 60%.",
      specs: [
        { label: "Solar Array", value: "28x 550W Tier-1 Mono" },
        { label: "Inverter", value: "15kW Industrial Three-Phase" },
        { label: "Roof Type", value: "Corrugated Galvanized Metal" },
        { label: "Est. Savings", value: "₱17,000 – ₱24,000 / mo" }
      ],
      photos: [
        {
          title: "Warehouse Rooftop",
          svg: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="300" fill="#030712"/>
            <rect x="40" y="130" width="320" height="130" fill="#374151"/>
            <rect x="60" y="145" width="85" height="100" fill="#1d4ed8" stroke="#38bdf8" stroke-width="2"/>
            <rect x="155" y="145" width="85" height="100" fill="#1d4ed8" stroke="#38bdf8" stroke-width="2"/>
            <rect x="250" y="145" width="85" height="100" fill="#1d4ed8" stroke="#38bdf8" stroke-width="2"/>
            <circle cx="340" cy="50" r="26" fill="#F59E0B" opacity="0.85"/>
            <text x="200" y="285" text-anchor="middle" fill="#94a3b8" font-size="12" font-family="Inter">Commercial Multi-String Setup</text>
          </svg>`
        }
      ]
    },
    p6: {
      title: "6.6kW Residential Grid-Tied",
      location: "📍 Davao City, Davao del Sur",
      capacity: "6.6 kW System",
      description: "A tailored residential system balancing high ROI with roof space efficiency, ideal for suburban multi-storey houses with high monthly consumption.",
      specs: [
        { label: "Solar Array", value: "12x 550W High-Efficiency" },
        { label: "Inverter", value: "6kW Smart String Inverter" },
        { label: "Roof Type", value: "Concrete Tile Pitch" },
        { label: "Est. Savings", value: "₱6,500 – ₱9,500 / mo" }
      ],
      photos: [
        {
          title: "South-Facing Array",
          svg: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="300" fill="#0f172a"/>
            <polygon points="40,255 200,125 360,255" fill="#1e293b"/>
            <polygon points="75,235 200,140 325,235" fill="#0369a1" stroke="#38bdf8" stroke-width="2"/>
            <circle cx="65" cy="55" r="24" fill="#F59E0B" opacity="0.9"/>
            <text x="200" y="285" text-anchor="middle" fill="#94a3b8" font-size="12" font-family="Inter">Optimized South-Facing Solar Deck</text>
          </svg>`
        }
      ]
    }
  };

  function openProjectModal(projectId) {
    const data = projectDetailsData[projectId];
    if (!data || !projectModal) return;

    modalTitle.textContent = data.title;
    modalLocation.textContent = data.location;
    modalDescription.textContent = data.description;
    modalCapacityBadge.textContent = data.capacity;

    // Render Specs
    modalSpecs.innerHTML = "";
    data.specs.forEach((s) => {
      const item = document.createElement("div");
      item.className = "spec-item";
      item.innerHTML = `
        <span class="spec-label">${s.label}</span>
        <span class="spec-value">${s.value}</span>
      `;
      modalSpecs.appendChild(item);
    });

    // Render Main Image (First photo)
    if (data.photos && data.photos.length > 0) {
      modalMainImage.innerHTML = data.photos[0].svg;
    }

    // Render Thumbnails
    modalThumbnails.innerHTML = "";
    if (data.photos && data.photos.length > 0) {
      data.photos.forEach((photo, idx) => {
        const thumb = document.createElement("div");
        thumb.className = `modal-thumb ${idx === 0 ? "active" : ""}`;
        thumb.innerHTML = `
          ${photo.svg}
          <span class="modal-thumb-title">${photo.title}</span>
        `;
        thumb.addEventListener("click", () => {
          document.querySelectorAll(".modal-thumb").forEach((t) => t.classList.remove("active"));
          thumb.classList.add("active");
          modalMainImage.innerHTML = photo.svg;
        });
        modalThumbnails.appendChild(thumb);
      });
    }

    projectModal.classList.add("active");
    projectModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden"; // Prevent page scroll while modal open
  }

  function closeProjectModal() {
    if (!projectModal) return;
    projectModal.classList.remove("active");
    projectModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  // Bind click & enter on project cards
  document.querySelectorAll(".project-card[data-project-id]").forEach((card) => {
    card.addEventListener("click", () => {
      const pId = card.getAttribute("data-project-id");
      openProjectModal(pId);
    });
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const pId = card.getAttribute("data-project-id");
        openProjectModal(pId);
      }
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeProjectModal);
  if (modalBackdrop) modalBackdrop.addEventListener("click", closeProjectModal);
  if (modalQuoteBtn) modalQuoteBtn.addEventListener("click", closeProjectModal);

  // Close modal on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && projectModal && projectModal.classList.contains("active")) {
      closeProjectModal();
    }
  });
  const themeToggle = document.getElementById("theme-toggle");
  
  function applyTheme(theme) {
    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    localStorage.setItem("theme", theme);
  }

  // Load saved theme or default to light
  const currentTheme = localStorage.getItem("theme") || "light";
  applyTheme(currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      const newTheme = isDark ? "light" : "dark";
      applyTheme(newTheme);
    });
  }
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const mobileToggle = document.getElementById("mobile-toggle");
  const navMenu = document.getElementById("nav-menu");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
    updateActiveNav();
  });

  // ─── Mobile menu toggle ─────────────────────────
  if (mobileToggle) {
    mobileToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      mobileToggle.classList.toggle("active");
    });
  }

  // Close mobile menu on link click
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      mobileToggle.classList.remove("active");
    });
  });

  // ─── Smooth scrolling ──────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const navHeight = navbar.offsetHeight;
        const targetPos = target.offsetTop - navHeight;
        window.scrollTo({ top: targetPos, behavior: "smooth" });
      }
    });
  });

  // ─── Active nav highlighting ───────────────────
  function updateActiveNav() {
    const sections = document.querySelectorAll("section[id]");
    const scrollPos = window.scrollY + 120;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  // ─── FAQ Accordion ─────────────────────────────
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      // Close all
      faqItems.forEach((i) => i.classList.remove("open"));

      // Open clicked (if it wasn't already open)
      if (!isOpen) {
        item.classList.add("open");
      }
    });
  });

  // ─── Scroll-triggered animations ──────────────
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.12,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".animate-on-scroll").forEach((el) => {
    observer.observe(el);
  });

  // ─── Contact form submission ──────────────────
  const contactForm = document.getElementById("contact-form");
  const formFeedback = document.getElementById("form-feedback");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      const formData = {
        name: document.getElementById("cf-name").value.trim(),
        contact: document.getElementById("cf-contact").value.trim(),
        monthly_bill: document.getElementById("cf-bill").value.trim(),
        message: document.getElementById("cf-message").value.trim(),
      };

      const showFeedback = (type, text) => {
        formFeedback.className = "form-feedback " + type;
        formFeedback.textContent = text;
      };

      // Backup delivery straight from the browser (used only if the server could not send the email)
      const sendViaFormSubmit = async () => {
        const resp = await fetch("https://formsubmit.co/ajax/af0574e6099a9c94919d690938b3a43f", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify({
            _subject: "☀️ New Solis Tectum Rooftop Inquiry from " + formData.name,
            "Client Name": formData.name,
            "Phone / Email": formData.contact,
            "Average Monthly Bill": "₱" + formData.monthly_bill,
            "Message / Project Details": formData.message || "No additional message",
          }),
        });
        const result = await resp.json().catch(() => ({}));
        return resp.ok && String(result.success) === "true";
      };

      try {
        // 1) Validate + email the lead from the Flask backend
        let serverResult = null;
        try {
          const resp = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });
          serverResult = await resp.json().catch(() => null);

          if (resp.status === 422 && serverResult && serverResult.errors) {
            showFeedback("error", serverResult.errors.join(" "));
            serverResult = "invalid";
          }
        } catch (err) {
          serverResult = null; // server unreachable — try the backup below
        }

        if (serverResult !== "invalid") {
          // 2) If the server didn't deliver the email, try the browser-side backup
          let delivered = !!(serverResult && serverResult.email_sent);
          if (!delivered) {
            delivered = await sendViaFormSubmit().catch(() => false);
          }

          if (delivered) {
            showFeedback("success", "Thank you, " + formData.name + "! Your inquiry has been sent to our engineering team. We will reach out within 24 hours.");
            contactForm.reset();
          } else {
            showFeedback("error", "Sorry, we couldn't send your inquiry right now. Please call us at 09763476557 or try again in a few minutes.");
          }
        }
      } catch (err) {
        showFeedback("error", "Sorry, something went wrong. Please call us at 09763476557 or try again.");
      }

      formFeedback.style.display = "block";
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;

      // Auto-hide after 10 seconds
      setTimeout(() => {
        formFeedback.style.display = "none";
      }, 10000);
    });
  }

  // ─── Star rating rendering ─────────────────────
  document.querySelectorAll(".stars").forEach((container) => {
    const rating = parseFloat(container.dataset.rating) || 5;
    let starsHTML = "";
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        starsHTML += '<span class="star filled">★</span>';
      } else if (i - rating < 1 && i - rating > 0) {
        starsHTML += '<span class="star half">★</span>';
      } else {
        starsHTML += '<span class="star">★</span>';
      }
    }
    container.innerHTML = starsHTML;
  });

  // ─── Counter animation ─────────────────────────
  const counters = document.querySelectorAll(".stat-number");
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => counterObserver.observe(counter));

  function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix || "";
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current) + suffix;
    }, 16);
  }

  // ─── Infinite Smooth Testimonials / Commitments Carousel ───
  const track = document.querySelector(".testimonials-track");
  const prevBtn = document.getElementById("carousel-prev");
  const nextBtn = document.getElementById("carousel-next");
  const viewport = document.querySelector(".testimonials-viewport");

  if (track && prevBtn && nextBtn && viewport) {
    const originalCards = Array.from(track.querySelectorAll(".testimonial-card"));
    const originalCount = originalCards.length;

    // Clone cards twice so we can loop indefinitely in either direction
    originalCards.forEach((c) => track.appendChild(c.cloneNode(true)));
    originalCards.forEach((c) => track.appendChild(c.cloneNode(true)));

    let currentIndex = originalCount; // Start on the middle set
    let isTransitioning = false;
    let autoPlayInterval = null;

    function getCardWidth() {
      const first = track.querySelector(".testimonial-card");
      return first ? first.getBoundingClientRect().width : 300;
    }

    function updateTrackPosition(withTransition = true) {
      const cardWidth = getCardWidth();
      track.style.transition = withTransition ? "transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)" : "none";
      track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }

    // Set initial position without animation
    requestAnimationFrame(() => {
      updateTrackPosition(false);
    });

    function nextSlide() {
      if (isTransitioning) return;
      isTransitioning = true;
      currentIndex++;
      updateTrackPosition(true);
    }

    function prevSlide() {
      if (isTransitioning) return;
      isTransitioning = true;
      currentIndex--;
      updateTrackPosition(true);
    }

    // Listen for transitionend to seamlessly wrap index
    track.addEventListener("transitionend", () => {
      isTransitioning = false;
      // Seamless infinite wrap
      if (currentIndex >= originalCount * 2) {
        currentIndex = originalCount;
        updateTrackPosition(false);
      } else if (currentIndex < originalCount) {
        currentIndex = originalCount * 2 - 1;
        updateTrackPosition(false);
      }
    });

    nextBtn.addEventListener("click", () => {
      stopAutoPlay();
      nextSlide();
      startAutoPlay();
    });

    prevBtn.addEventListener("click", () => {
      stopAutoPlay();
      prevSlide();
      startAutoPlay();
    });

    // Auto-scroll every 4 seconds
    function startAutoPlay() {
      stopAutoPlay();
      autoPlayInterval = setInterval(() => {
        nextSlide();
      }, 4000);
    }

    function stopAutoPlay() {
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
      }
    }

    // Pause on hover
    viewport.addEventListener("mouseenter", stopAutoPlay);
    viewport.addEventListener("mouseleave", startAutoPlay);

    // Start auto-scroll
    startAutoPlay();

    // Re-adjust track on window resize
    window.addEventListener("resize", () => {
      updateTrackPosition(false);
    });
  }
});

