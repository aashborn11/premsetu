import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import api from "../utils/axios";
import { loadRazorpayScript, openRazorpayCheckout } from "../utils/razorpay";
import { Mandala } from "../components/Festive";

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

// Payment status machine
// idle → loading (creating order) → verifying (after Razorpay callback) → done
// Any error branch: failed | dismissed
const STATUS = {
  IDLE:       "idle",
  LOADING:    "loading",
  VERIFYING:  "verifying",
  FAILED:     "failed",
  DISMISSED:  "dismissed"
};

const Membership = () => {
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [status, setStatus] = useState(STATUS.IDLE);
  const [errorMsg, setErrorMsg] = useState("");
  const [orderAmount, setOrderAmount] = useState(null); // paise from API

  // Already paid → no reason to be here
  if (user?.isPaid) {
    return <Navigate to="/matches" replace />;
  }

  const displayPrice = orderAmount
    ? `₹${(orderAmount / 100).toLocaleString("en-IN")}`
    : "₹499";

  const isProcessing =
    status === STATUS.LOADING || status === STATUS.VERIFYING;

  const handlePay = async () => {
    setStatus(STATUS.LOADING);
    setErrorMsg("");

    try {
      // ── Step 1: create Razorpay order on backend ───────────────────────
      const { data: order } = await api.post("/payment/create-order");
      setOrderAmount(order.amount);

      // ── Step 2: load script + open Razorpay checkout modal ─────────────
      await loadRazorpayScript();

      const paymentResponse = await openRazorpayCheckout({
        key:         order.keyId,
        amount:      order.amount,    // paise — Razorpay expects paise
        currency:    order.currency,
        name:        "PremSetu",
        description: "Membership — Full Profile Access",
        order_id:    order.orderId,
        prefill: {
          name:    user?.fullName  || "",
          email:   user?.email     || "",
          contact: user?.phone     || ""
        },
        theme: { color: "#7c2d12" }   // brick-red brand colour
      });

      // ── Step 3: verify HMAC signature on backend ────────────────────────
      // NEVER mark paid from the Razorpay callback alone — always verify.
      setStatus(STATUS.VERIFYING);

      const { data: verifyData } = await api.post("/payment/verify", {
        razorpay_order_id:   paymentResponse.razorpay_order_id,
        razorpay_payment_id: paymentResponse.razorpay_payment_id,
        razorpay_signature:  paymentResponse.razorpay_signature
      });

      if (verifyData.success) {
        // ── Step 4: update auth state then redirect ────────────────────────
        await refreshUser();
        toast.success("🎉 Membership confirmed! Welcome to PremSetu.");
        navigate("/matches");
      } else {
        setStatus(STATUS.FAILED);
        setErrorMsg(verifyData.message || "Payment could not be verified. Please try again.");
      }
    } catch (err) {
      if (err.message === "dismissed") {
        setStatus(STATUS.DISMISSED);
      } else {
        setStatus(STATUS.FAILED);
        setErrorMsg(
          err.response?.data?.message ||
          err.message ||
          "Something went wrong with the payment. Please try again."
        );
      }
    }
  };

  const buttonLabel = () => {
    switch (status) {
      case STATUS.LOADING:   return "Creating order...";
      case STATUS.VERIFYING: return "Verifying payment...";
      case STATUS.FAILED:    return `Try Again — ${displayPrice}`;
      default:               return `Get Membership — ${displayPrice}`;
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

      {/* ── CTA box ──────────────────────────────────────────────── */}
      <div className="membership-cta-box">
        <Mandala className="membership-mandala" />

        <div className="membership-price-row">
          <span className="membership-price shimmer-text">{displayPrice}</span>
          <span className="membership-price-note">
            one-time · lifetime access · no renewals
          </span>
        </div>

        {/* What's included */}
        <ul className="membership-checklist">
          {[
            "See full profiles & contact details",
            "Send unlimited interests",
            "Personal matchmaker support",
            "Kundli matching (coming soon)"
          ].map((item) => (
            <li key={item}><span className="membership-check">✓</span>{item}</li>
          ))}
        </ul>

        {/* Soft dismissal message */}
        {status === STATUS.DISMISSED && (
          <div className="membership-soft-prompt">
            Payment cancelled — no problem. Whenever you're ready, complete it
            below for full access. Your account is safe.
          </div>
        )}

        {/* Hard failure message */}
        {status === STATUS.FAILED && errorMsg && (
          <div className="membership-error-prompt">
            ⚠ {errorMsg}
          </div>
        )}

        <button
          className="primary-button membership-pay-btn"
          onClick={handlePay}
          disabled={isProcessing}
        >
          {buttonLabel()}
        </button>

        <div className="membership-trust-pills">
          <span className="membership-pill">🔒 100% Secure</span>
          <span className="membership-pill">♾️ Lifetime Access</span>
          <a href="/refund" className="membership-pill membership-pill-link">↩️ Refund Policy</a>
        </div>

        <p className="membership-secure-note">
          🔒 Secured by Razorpay · UPI, Cards, Net Banking &amp; Wallets accepted
        </p>
      </div>

    </section>
  );
};

export default Membership;
