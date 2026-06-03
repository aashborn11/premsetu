import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");

    if (!email || !password) {
      setFormError("Email aur password dono bharen. / Please enter both email and password.");
      return;
    }

    try {
      setSubmitting(true);
      await login({ email, password });
      toast.success("Login safal raha!");
      navigate("/dashboard");
    } catch (error) {
      const msg = error.response?.data?.message || "Login failed. Please check your email and password.";
      setFormError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="auth-shell">
      <div className="auth-layout">
        <aside className="auth-showcase">
          <div>
            <span className="eyebrow">Wapas aaiye</span>
            <h1>Apne matches aur conversations dekhein.</h1>
          </div>
          <p className="support-copy">
            Login karein aur apna profile, matches aur private chat access karein.
          </p>
          <div className="auth-point-grid">
            <article className="auth-point">
              <strong>Aapka profile safe hai</strong>
              <p>Sirf aap apna profile dekh aur edit kar sakte hain.</p>
            </article>
            <article className="auth-point">
              <strong>Mutual interest ke baad chat</strong>
              <p>Dono taraf se interest hone ke baad hi private chat khulti hai.</p>
            </article>
            <article className="auth-point">
              <strong>Serious rishte</strong>
              <p>Yahaan sirf serious log hain — koi time waste nahi.</p>
            </article>
          </div>
        </aside>

        <form className="auth-card" onSubmit={handleSubmit}>
          <div>
            <span className="eyebrow">Login karein</span>
            <h1>PremSetu mein Sign In</h1>
            <p>Apna email aur password enter karein.</p>
          </div>

          <div className="form-grid single-column">
            <label className="field-stack">
              <span>Email Address</span>
              <input
                placeholder="aapka@email.com"
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setFormError(""); }}
              />
            </label>

            <label className="field-stack">
              <span>Password</span>
              <input
                placeholder="Apna password dalein"
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setFormError(""); }}
              />
            </label>
          </div>

          {formError && (
            <div style={{
              padding: "14px 18px",
              borderRadius: 16,
              background: "#fff0ed",
              border: "1px solid rgba(181,69,27,0.3)",
              color: "#8b3214",
              fontWeight: 600,
              fontSize: "0.92rem",
              lineHeight: 1.6
            }}>
              ⚠ {formError}
            </div>
          )}

          <button className="primary-button full-width" disabled={submitting}>
            {submitting ? "Login ho raha hai..." : "Login Karein"}
          </button>

          <p>
            Naya account chahiye? <Link to="/register">Register karein</Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
