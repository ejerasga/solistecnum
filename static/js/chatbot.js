/**
 * Solis Tectum Solar Installation — Chatbot Widget
 * ==================================================
 * Floating AI-powered solar inquiry chatbot with
 * a clean, modern chat interface.
 */

document.addEventListener("DOMContentLoaded", () => {
  const chatToggle = document.getElementById("chat-toggle");
  const chatWidget = document.getElementById("chat-widget");
  const chatClose = document.getElementById("chat-close");
  const chatForm = document.getElementById("chat-form");
  const chatInput = document.getElementById("chat-input");
  const chatMessages = document.getElementById("chat-messages");

  // ─── Toggle chat widget ────────────────────────
  chatToggle.addEventListener("click", () => {
    chatWidget.classList.toggle("open");
    chatToggle.classList.toggle("hidden");
    if (chatWidget.classList.contains("open")) {
      chatInput.focus();
      // Show welcome message if first open
      if (chatMessages.children.length === 0) {
        appendMessage(
          "bot",
          "Hello! ☀️ I'm the Solis Tectum solar assistant. Ask me about pricing, bill savings, system types, installation timelines, or booking a site assessment!"
        );
        appendQuickReplies([
          "How much can I save?",
          "Get a free quote",
          "Installation timeline",
          "System types",
        ]);
      }
    }
  });

  chatClose.addEventListener("click", () => {
    chatWidget.classList.remove("open");
    chatToggle.classList.remove("hidden");
  });

  // ─── Send message ──────────────────────────────
  chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = chatInput.value.trim();
    if (!message) return;

    appendMessage("user", message);
    chatInput.value = "";

    // Show typing indicator
    const typingEl = showTypingIndicator();

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      removeTypingIndicator(typingEl);

      if (data.reply) {
        appendMessage("bot", data.reply);
      } else if (data.error) {
        appendMessage("bot", "Sorry, something went wrong. Please try again.");
      }
    } catch (err) {
      removeTypingIndicator(typingEl);
      appendMessage(
        "bot",
        "Connection error. Please check your network and try again."
      );
    }
  });

  // ─── Append message to chat ────────────────────
  function appendMessage(sender, text) {
    const msgDiv = document.createElement("div");
    msgDiv.className = `chat-msg ${sender}`;

    const bubble = document.createElement("div");
    bubble.className = "chat-bubble";
    // Support markdown-like bold (**text**)
    bubble.innerHTML = text.replace(
      /\*\*(.*?)\*\*/g,
      "<strong>$1</strong>"
    ).replace(/\n/g, "<br>");

    msgDiv.appendChild(bubble);
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // ─── Quick reply buttons ───────────────────────
  function appendQuickReplies(replies) {
    const container = document.createElement("div");
    container.className = "quick-replies";

    replies.forEach((text) => {
      const btn = document.createElement("button");
      btn.className = "quick-reply-btn";
      btn.textContent = text;
      btn.addEventListener("click", () => {
        container.remove();
        chatInput.value = text;
        chatForm.dispatchEvent(new Event("submit"));
      });
      container.appendChild(btn);
    });

    chatMessages.appendChild(container);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // ─── Typing indicator ─────────────────────────
  function showTypingIndicator() {
    const typingDiv = document.createElement("div");
    typingDiv.className = "chat-msg bot typing-indicator";
    typingDiv.innerHTML = `
      <div class="chat-bubble typing">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>
    `;
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return typingDiv;
  }

  function removeTypingIndicator(el) {
    if (el && el.parentNode) {
      el.parentNode.removeChild(el);
    }
  }
});

