import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { PremSetuMark } from "../components/Logo";

const MONTHS = [
  { v: "01", l: "January (Jan)" }, { v: "02", l: "February (Feb)" },
  { v: "03", l: "March (Mar)" },   { v: "04", l: "April (Apr)" },
  { v: "05", l: "May (May)" },     { v: "06", l: "June (Jun)" },
  { v: "07", l: "July (Jul)" },    { v: "08", l: "August (Aug)" },
  { v: "09", l: "September (Sep)" },{ v: "10", l: "October (Oct)" },
  { v: "11", l: "November (Nov)" },{ v: "12", l: "December (Dec)" }
];

const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0"));
const CY = new Date().getFullYear();
const YEARS = Array.from({ length: 55 }, (_, i) => String(CY - 18 - i));

const dropStyle = {
  width: "100%",
  padding: "13px 12px",
  border: "1.5px solid #e7e3de",
  borderRadius: 14,
  background: "#fff",
  color: "#1c1917",
  font: "inherit",
  fontSize: "0.95rem",
  outline: "none",
  cursor: "pointer",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease"
};

const Register = () => {
  const [form, setForm] = useState({
    fullName: "", email: "", password: "", phone: "", gender: "female"
  });
  const [dobDay, setDobDay]     = useState("");
  const [dobMonth, setDobMonth] = useState("");
  const [dobYear, setDobYear]   = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate  = useNavigate();

  const set = (k, v) => { setForm(p => ({ ...p, [k]: v })); setError(""); };

  const pwdCheck = useMemo(() => ({
    length:  form.password.length >= 8,
    upper:   /[A-Z]/.test(form.password),
    lower:   /[a-z]/.test(form.password),
    number:  /\d/.test(form.password)
  }), [form.password]);

  const pwdOk = Object.values(pwdCheck).every(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.fullName || !form.email || !form.password || !form.phone) {
      setError("Please fill in all fields before submitting.");
      return;
    }
    if (!dobDay || !dobMonth || !dobYear) {
      setError("Please select your complete date of birth (day, month and year).");
      return;
    }
    if (!pwdOk) {
      setError("Password is not strong enough. Please check the requirements below.");
      return;
    }

    try {
      setSubmitting(true);
      const dateOfBirth = `${dobYear}-${dobMonth}-${dobDay}`;
      await login({ ...form, dateOfBirth }, "/auth/register");
      toast.success("Account created! Let's complete your profile.");
      navigate("/edit-profile");
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed. Please try again.";
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
            <span className="eyebrow">Start your journey</span>
            <h1>Create your profile and find the right match.</h1>
          </div>
          <p className="support-copy">
            Just a few basic details to get started. You can complete your full profile later.
          </p>
          <div className="auth-point-grid">
            {[
              { t: "Simple registration", d: "Fill only the basics now. Add religion, city, education later." },
              { t: "Private & safe",       d: "Your details are only shared with profiles you connect with." },
              { t: "Genuine matches",      d: "Only serious people looking for real relationships." }
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
            <span className="eyebrow">New account</span>
            <h1>Join PremSetu</h1>
            <p>Use your real details — accurate profiles get better responses.</p>
          </div>

          <div className="form-grid">
            <label className="field-stack">
              <span>Full Name</span>
              <input placeholder="e.g. Ramesh Kumar" value={form.fullName}
                onChange={e => set("fullName", e.target.value)} />
            </label>

            <label className="field-stack">
              <span>Email Address</span>
              <input placeholder="yourname@email.com" type="email" value={form.email}
                onChange={e => set("email", e.target.value)} />
            </label>

            <label className="field-stack" style={{ gridColumn: "1 / -1" }}>
              <span>Password</span>
              <input placeholder="Create a password" type="password" value={form.password}
                onChange={e => set("password", e.target.value)} />
              {/* Password strength row */}
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 4 }}>
                {[
                  [pwdCheck.length,  "8+ characters"],
                  [pwdCheck.upper,   "Capital letter (A-Z)"],
                  [pwdCheck.lower,   "Small letter (a-z)"],
                  [pwdCheck.number,  "Number (0-9)"]
                ].map(([ok, label]) => (
                  <span key={label} style={{
                    display: "inline-flex", alignItems: "center", gap: 5,
                    fontSize: "0.8rem", fontWeight: 600,
                    color: ok ? "#16a34a" : "#9ca3af",
                    transition: "color 0.2s ease"
                  }}>
                    <span style={{
                      width: 14, height: 14, borderRadius: "50%",
                      background: ok ? "#16a34a" : "#e5e7eb",
                      display: "grid", placeItems: "center",
                      fontSize: "0.55rem", color: "#fff",
                      flexShrink: 0, transition: "background 0.25s ease"
                    }}>{ok ? "✓" : ""}</span>
                    {label}
                  </span>
                ))}
              </div>
            </label>

            <label className="field-stack">
              <span>Mobile Number</span>
              <input placeholder="10-digit number" value={form.phone}
                onChange={e => set("phone", e.target.value)} />
            </label>

            <label className="field-stack">
              <span>Gender</span>
              <select value={form.gender} onChange={e => set("gender", e.target.value)}>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
            </label>

            {/* DOB — three dropdowns */}
            <div className="field-stack" style={{ gridColumn: "1 / -1" }}>
              <span>Date of Birth</span>
              <small>Select day, month and year separately</small>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1fr", gap: 10 }}>
                <select value={dobDay} onChange={e => setDobDay(e.target.value)} style={dropStyle}>
                  <option value="">Day</option>
                  {DAYS.map(d => <option key={d} value={d}>{parseInt(d)}</option>)}
                </select>
                <select value={dobMonth} onChange={e => setDobMonth(e.target.value)} style={dropStyle}>
                  <option value="">Month</option>
                  {MONTHS.map(m => <option key={m.v} value={m.v}>{m.l}</option>)}
                </select>
                <select value={dobYear} onChange={e => setDobYear(e.target.value)} style={dropStyle}>
                  <option value="">Year</option>
                  {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            </div>
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
            {submitting ? "Creating account..." : "Create My Profile"}
          </button>

          <p style={{ textAlign: "center" }}>
            Already registered?{" "}
            <Link to="/login" style={{ color: "var(--primary)", fontWeight: 700 }}>Login here</Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;
