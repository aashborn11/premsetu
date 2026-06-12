// ─── PremSetu Assistant — reply logic ─────────────────────────────────────────
//
// ALL reply logic lives here. Currently rule-based keyword matching.
//
// TO UPGRADE TO A REAL AI BACKEND:
//   1. Replace the body of getBotReply() with an async fetch to your API.
//   2. Change the function signature to async and update the caller in
//      HelpBot.jsx to await it (one line change — look for "await getBotReply").
//   3. Keep the reply shape: { text: string, link?: { to: string, label: string } }
//
// Note: keyword lists keep a few common Hindi spellings so matching still works
// when users type them — but all replies are in simple, clean English.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Returns a reply object for the given user message.
 * @param {string} raw - The raw user input string.
 * @returns {{ text: string, link?: { to: string, label: string } }}
 */
export function getBotReply(raw) {
  const msg = raw.toLowerCase().trim();

  // ── What is PremSetu / how it works ──────────────────────────────────────
  if (
    has(msg, ["kya hai", "what is", "premsetu kya", "how does", "how it work",
               "ke baare", "about premsetu", "tell me about"])
  ) {
    return {
      text:
        "PremSetu is a trusted Indian matrimony platform for every community. " +
        "Create a profile, find suitable matches, and connect when the interest " +
        "is mutual. Simple, safe, and family-first.",
    };
  }

  // ── Register / create profile ─────────────────────────────────────────────
  if (
    has(msg, ["register", "sign up", "signup", "create profile", "profile kaise",
               "account kaise", "join", "new account"])
  ) {
    return {
      text:
        "Registering is free. Tap 'Create Free Profile', add your basic " +
        "details, and your account is ready. Then complete your profile to " +
        "get the best matches.",
    };
  }

  // ── Membership / price / what it unlocks ─────────────────────────────────
  if (
    has(msg, ["membership", "499", "price", "kitna", "cost", "fee", "fees", "paid",
               "premium", "plan", "charges", "payment", "unlock", "benefits"])
  ) {
    return {
      text:
        "Membership is just ₹499 — a one-time UPI payment (PhonePe, GPay, Paytm), no monthly fees. " +
        "It unlocks full profile details, contact information, and messaging.",
    };
  }

  // ── Safety / privacy / secure ─────────────────────────────────────────────
  if (
    has(msg, ["safe", "safety", "secure", "privacy", "data", "personal",
               "private", "photo", "trust", "protected", "dpdp"])
  ) {
    return {
      text:
        "Your privacy comes first. Phone, email, religion and other details are " +
        "shown only to paid members, and the site is secured end-to-end. We " +
        "follow India's DPDP Act, 2023.",
      link: { to: "/privacy", label: "Read our Privacy Policy" },
    };
  }

  // ── Matches / how introductions work ─────────────────────────────────────
  if (
    has(msg, ["match", "matches", "introduction", "suggest", "rishta",
               "connect", "interest", "mutual", "find"])
  ) {
    return {
      text:
        "When you show interest in a profile and they do too, it becomes a " +
        "mutual match. Our experienced team helps with every introduction " +
        "personally — real, thoughtful matchmaking.",
    };
  }

  // ── Refund / cancellation ─────────────────────────────────────────────────
  if (
    has(msg, ["refund", "cancel", "return", "money back", "cancellation",
               "refundable"])
  ) {
    return {
      text: "Our full refund and cancellation terms are on the Refund page — please take a look.",
      link: { to: "/refund", label: "Read the Refund Policy" },
    };
  }

  // ── Contact / talk to a human / support ──────────────────────────────────
  if (
    has(msg, ["contact", "support", "help", "team", "phone", "call",
               "email", "reach", "human", "agent", "helpline",
               "customer care", "complaint", "issue", "problem"])
  ) {
    return {
      text:
        "Want to talk to our team? You'll find our email and phone on the " +
        "Contact page. We usually reply within 24–48 hours.",
      link: { to: "/contact", label: "Go to Contact page" },
    };
  }

  // ── Hello / greeting ──────────────────────────────────────────────────────
  if (
    has(msg, ["hello", "hi", "hey", "namaste", "helo", "hii", "good morning",
               "good evening"])
  ) {
    return {
      text:
        "Namaste! 🙏 I'm the PremSetu Assistant. Ask me about membership, " +
        "registration, privacy, or how matches work. How can I help?",
    };
  }

  // ── Fallback ──────────────────────────────────────────────────────────────
  return {
    text:
      "I can only help with a few things for now. For anything else, our team " +
      "is happy to help — just visit the Contact page.",
    link: { to: "/contact", label: "Go to Contact page" },
  };
}

// ── helpers ───────────────────────────────────────────────────────────────────
/** Returns true if msg contains at least one keyword from the list. */
function has(msg, keywords) {
  return keywords.some((kw) => msg.includes(kw));
}
