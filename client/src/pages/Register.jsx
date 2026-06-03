import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const MONTHS = [
  { value: "01", label: "January - जनवरी" },
  { value: "02", label: "February - फरवरी" },
  { value: "03", label: "March - मार्च" },
  { value: "04", label: "April - अप्रैल" },
  { value: "05", label: "May - मई" },
  { value: "06", label: "June - जून" },
  { value: "07", label: "July - जुलाई" },
  { value: "08", label: "August - अगस्त" },
  { value: "09", label: "September - सितंबर" },
  { value: "10", label: "October - अक्टूबर" },
  { value: "11", label: "November - नवंबर" },
  { value: "12", label: "December - दिसंबर" }
];

const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0"));

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 60 }, (_, i) => String(currentYear - 18 - i));

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    gender: "female"
  });
  const [dobDay, setDobDay] = useState("");
  const [dobMonth, setDobMonth] = useState("");
  const [dobYear, setDobYear] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setFormError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");

    const { fullName, email, password, phone, gender } = formData;

    if (!fullName || !email || !password || !phone || !gender) {
      setFormError("Sabhi fields bharna zaroori hai. / Please fill all fields.");
      return;
    }

    if (!dobDay || !dobMonth || !dobYear) {
      setFormError("Date of Birth sahi se bharen. / Please select your full date of birth.");
      return;
    }

    const dateOfBirth = `${dobYear}-${dobMonth}-${dobDay}`;

    try {
      setSubmitting(true);
      await login({ ...formData, dateOfBirth }, "/auth/register");
      toast.success("PremSetu mein aapka swagat hai!");
      navigate("/dashboard");
    } catch (error) {
      const msg = error.response?.data?.message || "Registration failed. Please try again.";
      setFormError(msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="auth-shell">
      <div className="auth-layout">
        <aside className="auth-showcase">
          <div>
            <span className="eyebrow">Shuru karein</span>
            <h1>Apna profile banayein aur sahi rishta dhundhen.</h1>
          </div>
          <p className="support-copy">
            Sirf basic details chahiye abhi. Baaki profile baad mein bhar sakte hain.
          </p>
          <div className="auth-point-grid">
            <article className="auth-point">
              <strong>Aasaan registration</strong>
              <p>Simple fields, koi confusion nahi. Bas naam, number aur date of birth.</p>
            </article>
            <article className="auth-point">
              <strong>Private aur safe</strong>
              <p>Aapki details sirf matched profiles ke saath share hoti hain.</p>
            </article>
            <article className="auth-point">
              <strong>Serious rishte</strong>
              <p>Yahan sirf wahi log hain jo sach mein rishta dhundh rahe hain.</p>
            </article>
          </div>
        </aside>

        <form className="auth-card" onSubmit={handleSubmit}>
          <div>
            <span className="eyebrow">Naya account</span>
            <h1>PremSetu Join Karein</h1>
            <p>Apni sahi details bharen — isse aapko better matches milenge.</p>
          </div>

          <div className="form-grid">
            <label className="field-stack">
              <span>Poora Naam / Full Name</span>
              <input
                placeholder="Jaise: Ramesh Kumar"
                value={formData.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
              />
            </label>

            <label className="field-stack">
              <span>Email Address</span>
              <input
                placeholder="aapka@email.com"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </label>

            <label className="field-stack">
              <span>Password</span>
              <input
                placeholder="Min 8 characters, 1 capital, 1 number, 1 symbol"
                type="password"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
              />
              <small style={{ color: "var(--muted)", fontSize: "0.82rem" }}>
                Example: Ramesh@123
              </small>
            </label>

            <label className="field-stack">
              <span>Mobile Number</span>
              <input
                placeholder="10 digit number"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </label>

            <label className="field-stack">
              <span>Ling / Gender</span>
              <select value={formData.gender} onChange={(e) => handleChange("gender", e.target.value)}>
                <option value="female">Mahila / Female</option>
                <option value="male">Purush / Male</option>
                <option value="other">Anya / Other</option>
              </select>
            </label>

            <div className="field-stack" style={{ gridColumn: "1 / -1" }}>
              <span>Janam Tithi / Date of Birth</span>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1fr", gap: 10 }}>
                <select
                  value={dobDay}
                  onChange={(e) => setDobDay(e.target.value)}
                  style={{ padding: "16px 10px", border: "1px solid rgba(181,69,27,0.2)", borderRadius: 20, background: "rgba(255,255,255,0.88)", color: "var(--ink)", font: "inherit" }}
                >
                  <option value="">Din / Day</option>
                  {DAYS.map((d) => <option key={d} value={d}>{parseInt(d)}</option>)}
                </select>
                <select
                  value={dobMonth}
                  onChange={(e) => setDobMonth(e.target.value)}
                  style={{ padding: "16px 10px", border: "1px solid rgba(181,69,27,0.2)", borderRadius: 20, background: "rgba(255,255,255,0.88)", color: "var(--ink)", font: "inherit" }}
                >
                  <option value="">Mahina / Month</option>
                  {MONTHS.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
                </select>
                <select
                  value={dobYear}
                  onChange={(e) => setDobYear(e.target.value)}
                  style={{ padding: "16px 10px", border: "1px solid rgba(181,69,27,0.2)", borderRadius: 20, background: "rgba(255,255,255,0.88)", color: "var(--ink)", font: "inherit" }}
                >
                  <option value="">Saal / Year</option>
                  {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            </div>
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

          <div className="helper-ribbon">
            Tip: Password mein ek capital letter, ek number aur ek symbol zaroor hona chahiye. Jaise: Ramesh@123
          </div>

          <button className="primary-button full-width" disabled={submitting}>
            {submitting ? "Account ban raha hai..." : "Mera Profile Banao"}
          </button>

          <p>
            Pehle se account hai? <Link to="/login">Login karein</Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;
