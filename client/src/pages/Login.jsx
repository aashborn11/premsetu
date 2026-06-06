import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { PremSetuMark } from "../components/Logo";

const Login = () => {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate  = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both your email address and password.");
      return;
    }

    try {
      setSubmitting(true);
      const data = await login({ email, password });
      const firstName = data?.user?.fullName?.split(" ")?.[0] || "";

      // One-time welcome popup — shows only here, never on page reload
      toast.custom((t) => (
        <div className={`welcome-toast${t.visible ? " welcome-toast--in" : " welcome-toast--out"}`}>
          <span className="welcome-toast-emoji">🙏</span>
          <div>
            <p className="welcome-toast-title">
              {firstName ? `Namaste, ${firstName}!` : "Welcome back!"}
            </p>
            <p className="welcome-toast-sub">Welcome back to PremSetu</p>
          </div>
        </div>
      ), { duration: 3500 });

      navigate("/dashboard");
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed. Please check your email and password.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="auth-shell">
      <div className="auth-layout">

        {/* LEFT PANEL */}
        <aside className="auth-showcase">
          <PremSetuMark height={56} className="auth-showcase-mark" />
          <div>
            <span className="eyebrow">Welcome back</span>
            <h1>Return to your matches.</h1>
          </div>
          <p className="support-copy">
            Login and continue where you left off — view profiles and send interest to your matches.
          </p>
          <div className="auth-point-grid">
            {[
              { t: "Your profile is safe",   d: "Only you can see and edit your full account details." },
              { t: "Personal matchmaker",    d: "Our team helps with every introduction, personally." },
              { t: "Genuine people only",    d: "Everyone here is looking for a serious relationship." }
            ].map(i => (
              <article key={i.t} className="auth-point">
                <strong>{i.t}</strong>
                <p>{i.d}</p>
              </article>
            ))}
          </div>
        </aside>

        {/* FORM */}
        <form className="auth-card" onSubmit={handleSubmit}>
          <div>
            <span className="eyebrow">Sign in</span>
            <h1>Login to PremSetu</h1>
            <p>Enter your email and password to continue.</p>
          </div>

          <div className="form-grid single-column">
            <label className="field-stack">
              <span>Email Address</span>
              <input
                placeholder="yourname@email.com"
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(""); }}
                autoComplete="email"
              />
            </label>

            <label className="field-stack">
              <span>Password</span>
              <input
                placeholder="Your password"
                type="password"
                value={password}
                onChange={e => { setPassword(e.target.value); setError(""); }}
                autoComplete="current-password"
              />
            </label>
          </div>

          {error && (
            <div style={{
              padding: "14px 18px", borderRadius: 14,
              background: "#fff1f0", border: "1.5px solid #fca5a5",
              color: "#b91c1c", fontWeight: 600, fontSize: "0.9rem", lineHeight: 1.6
            }}>
              ⚠ {error}
            </div>
          )}

          <button className="primary-button full-width" type="submit" disabled={submitting}>
            {submitting ? "Logging in..." : "Login"}
          </button>

          <p style={{ textAlign: "center" }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "var(--primary)", fontWeight: 700 }}>Register here</Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
