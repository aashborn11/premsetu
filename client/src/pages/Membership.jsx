import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { QRCodeSVG } from "qrcode.react";
import { useAuth } from "../context/AuthContext";
import api from "../utils/axios";
import { Mandala } from "../components/Festive";
import {
  PAYMENT,
  PAYMENT_IS_PLACEHOLDER,
  UPI_PAY_LINK
} from "../config";

const FEATURES = [
  {
    icon: "💎",
    title: "Full Profiles & Contact",
    desc: "See complete profiles — phone, religion, education and more."
  },
  {
    icon: "🔮",
    title: "Kundli & Gun Milan",
    desc: "Match horoscopes and share with family. (Coming soon)"
  },
  {
    icon: "🤝",
    title: "Personal Matchmaker",
    desc: "Our team helps you personally, every step of the way."
  }
];

const PAY_STEPS = [
  { icon: "📱", text: "Scan the QR with any UPI app — PhonePe, GPay, Paytm" },
  { icon: "💸", text: "Pay the membership amount shown below" },
  { icon: "✅", text: "Tap “I Have Paid” and start browsing instantly" }
];

const Membership = () => {
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [confirming, setConfirming] = useState(false);
  const [txnId, setTxnId] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Already paid → no reason to be here
  if (user?.isPaid) {
    return <Navigate to="/matches" replace />;
  }

  const displayPrice = `₹${PAYMENT.AMOUNT_RUPEES.toLocaleString("en-IN")}`;

  const handleCopyUpi = async () => {
    try {
      await navigator.clipboard.writeText(PAYMENT.UPI_ID);
      toast.success("UPI ID copied!");
    } catch {
      toast.error("Could not copy. Long-press the ID to copy manually.");
    }
  };

  const handleConfirm = async () => {
    setConfirming(true);
    setErrorMsg("");
    try {
      const { data } = await api.post("/payment/confirm", {
        txnId: txnId.trim()
      });
      if (data.success) {
        await refreshUser();
        toast.success("🎉 Membership activated! Welcome to PremSetu.");
        navigate("/matches");
      } else {
        setErrorMsg(data.message || "Could not activate membership. Please try again.");
      }
    } catch (err) {
      setErrorMsg(
        err.response?.data?.message ||
        "Something went wrong. Please try again or contact us."
      );
    } finally {
      setConfirming(false);
    }
  };

  return (
    <section className="page-shell">

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <div className="membership-hero">
        <span className="eyebrow">🪔 Premium Membership</span>
        <h1>One membership. Every detail.</h1>
        <p className="section-copy">
          Registering is free. Upgrade once to unlock full profiles, contact
          details, and personal matchmaker support.{" "}
          <strong>Just {displayPrice} — lifetime, no hidden charges.</strong>
        </p>
      </div>

      {/* ── Feature cards ────────────────────────────────────────── */}
      <div className="membership-features fest-stagger">
        {FEATURES.map((f) => (
          <article key={f.title} className="membership-card">
            <span className="membership-icon">{f.icon}</span>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </article>
        ))}
      </div>

      {/* ── Payment box ──────────────────────────────────────────── */}
      <div className="membership-cta-box">
        <Mandala className="membership-mandala" />

        {PAYMENT_IS_PLACEHOLDER && (
          <div className="membership-placeholder-warning">
            ⚠ Demo payment details — the real UPI ID will be added before launch.
          </div>
        )}

        <div className="membership-price-row">
          <span className="membership-price shimmer-text">{displayPrice}</span>
          <span className="membership-price-note">
            one-time · lifetime access · no renewals
          </span>
        </div>

        {/* How to pay */}
        <ol className="membership-pay-steps">
          {PAY_STEPS.map((s) => (
            <li key={s.text}>
              <span className="membership-pay-step-icon">{s.icon}</span>
              {s.text}
            </li>
          ))}
        </ol>

        {/* QR + UPI details */}
        <div className="membership-qr-row">
          <div className="membership-qr-frame">
            {PAYMENT.QR_IMAGE ? (
              <img
                src={`${process.env.PUBLIC_URL}${PAYMENT.QR_IMAGE}`}
                alt="UPI payment QR code"
                className="membership-qr-img"
              />
            ) : (
              <QRCodeSVG
                value={UPI_PAY_LINK}
                size={188}
                level="M"
                marginSize={2}
                title="UPI payment QR code"
              />
            )}
            <span className="membership-qr-caption">Scan with any UPI app</span>
          </div>

          <div className="membership-upi-details">
            <span className="membership-upi-label">Or pay directly to UPI ID</span>
            <div className="membership-upi-id-row">
              <code className="membership-upi-id">{PAYMENT.UPI_ID}</code>
              <button
                type="button"
                className="ghost-button membership-copy-btn"
                onClick={handleCopyUpi}
              >
                Copy
              </button>
            </div>

            <a href={UPI_PAY_LINK} className="secondary-button membership-upi-app-btn">
              📲 Pay {displayPrice} in UPI App
            </a>
            {PAYMENT.PHONEPE_LINK && (
              <a
                href={PAYMENT.PHONEPE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="secondary-button membership-upi-app-btn"
              >
                💜 Pay via PhonePe Link
              </a>
            )}
            <span className="membership-upi-hint">
              The app buttons work on mobile. On a computer, scan the QR with your phone.
            </span>
          </div>
        </div>

        {/* Confirm after paying */}
        <div className="membership-confirm-block">
          <label className="membership-txn-label" htmlFor="membership-txn">
            UPI Transaction / UTR ID <span className="membership-txn-optional">(optional, helps us verify faster)</span>
          </label>
          <input
            id="membership-txn"
            type="text"
            className="membership-txn-input"
            placeholder="e.g. 415212345678"
            value={txnId}
            maxLength={60}
            onChange={(e) => setTxnId(e.target.value)}
          />

          {errorMsg && (
            <div className="membership-error-prompt">⚠ {errorMsg}</div>
          )}

          <button
            className="primary-button membership-pay-btn"
            onClick={handleConfirm}
            disabled={confirming}
          >
            {confirming ? "Activating..." : `✅ I Have Paid ${displayPrice}`}
          </button>
          <span className="membership-confirm-note">
            Payments are checked against our bank records. False confirmations
            lead to account suspension.
          </span>
        </div>

        <div className="membership-trust-pills">
          <span className="membership-pill">🔒 100% Secure UPI</span>
          <span className="membership-pill">♾️ Lifetime Access</span>
          <a href="/refund" className="membership-pill membership-pill-link">↩️ Refund Policy</a>
        </div>

        <p className="membership-secure-note">
          🔒 Pay securely with PhonePe, Google Pay, Paytm or any UPI app
        </p>
      </div>

    </section>
  );
};

export default Membership;
