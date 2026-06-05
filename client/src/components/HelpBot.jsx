import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getBotReply } from "../utils/botReply";

const GREETING = {
  from: "bot",
  text:
    "Namaste! 🙏 I'm the PremSetu Assistant. " +
    "Ask me about registration, membership, matches, or privacy.",
};

const HelpBot = () => {
  const [open, setOpen]       = useState(false);
  const [messages, setMessages] = useState([GREETING]);
  const [input, setInput]     = useState("");
  const [typing, setTyping]   = useState(false);
  const bottomRef             = useRef(null);
  const inputRef              = useRef(null);

  /* Scroll to latest message */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  /* Focus input when panel opens */
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;

    const userMsg = { from: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    // Simulate a short "thinking" delay so it doesn't feel instant.
    // TO UPGRADE: make getBotReply async here — await it inside setTimeout or
    // replace the setTimeout with a real fetch.
    setTimeout(() => {
      const reply = getBotReply(text);
      setMessages((prev) => [...prev, { from: "bot", ...reply }]);
      setTyping(false);
    }, 520);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  return (
    <div className="helpbot-root">
      {/* ── Floating toggle button ── */}
      <button
        className={`helpbot-fab ${open ? "helpbot-fab--open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close PremSetu Assistant" : "Open PremSetu Assistant"}
        title="PremSetu Assistant"
      >
        {open ? (
          /* × close */
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2.2"
                  strokeLinecap="round"/>
          </svg>
        ) : (
          /* chat bubble */
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        <span className="helpbot-fab-label">Help</span>
      </button>

      {/* ── Chat panel ── */}
      <div className={`helpbot-panel ${open ? "helpbot-panel--open" : ""}`}
           role="dialog" aria-label="PremSetu Assistant">

        {/* Header */}
        <div className="helpbot-header">
          <div className="helpbot-header-info">
            <span className="helpbot-avatar">🤝</span>
            <div>
              <p className="helpbot-header-name">PremSetu Assistant</p>
              <p className="helpbot-header-sub">Here to help you</p>
            </div>
          </div>
          <button className="helpbot-close-btn" onClick={() => setOpen(false)}
                  aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2.2"
                    strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="helpbot-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`helpbot-msg helpbot-msg--${msg.from}`}>
              <p>{msg.text}</p>
              {msg.link && (
                <Link to={msg.link.to} className="helpbot-link"
                      onClick={() => setOpen(false)}>
                  {msg.link.label} →
                </Link>
              )}
            </div>
          ))}

          {typing && (
            <div className="helpbot-msg helpbot-msg--bot">
              <span className="helpbot-typing">
                <span/><span/><span/>
              </span>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Quick suggestions */}
        <div className="helpbot-suggestions">
          {["Membership price?", "Is it safe?", "How to register?"].map((q) => (
            <button key={q} className="helpbot-chip"
                    onClick={() => { setInput(q); inputRef.current?.focus(); }}>
              {q}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="helpbot-input-row">
          <input
            ref={inputRef}
            className="helpbot-input"
            type="text"
            placeholder="Ask me anything…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            maxLength={200}
          />
          <button className="helpbot-send" onClick={sendMessage}
                  disabled={!input.trim()} aria-label="Bhejo">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                    strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpBot;
