import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiligreeDivider, Mandala } from "../components/Festive";
import { PremSetuMark } from "../components/Logo";

/*
 * Hero image: drop hero.jpg into /public/ — loaded automatically.
 * Recommended: compressed JPEG or WebP, landscape, ≥1600 px wide.
 */

const brandBadges = [
  { icon: "🛡️", label: "Trusted" },
  { icon: "🪔", label: "Indian Values" },
  { icon: "👪", label: "Cultured Matches" },
  { icon: "🔒", label: "Safe & Private" }
];

const steps = [
  { title: "Register Free", text: "Create your profile in minutes." },
  { title: "Complete Your Profile", text: "Add your details and preferences." },
  { title: "Find Your Match", text: "Connect when the interest is mutual." }
];

const whyFeatures = [
  { icon: "🛡️", title: "Verified Profiles", text: "Real people, genuine intent." },
  { icon: "🔒", title: "Privacy First", text: "Your details stay protected." },
  { icon: "🤝", title: "Personal Matchmaker", text: "We guide every introduction." },
  { icon: "🔮", title: "Kundli Matching", text: "Horoscope match, coming soon." }
];

const Home = () => {
  const { user } = useAuth();

  return (
    <main>

      {/* ── 1. HERO ── */}
      <div className="home-hero-full">
        {/* Replace /public/hero.jpg to swap the background image */}
        <div
          className="home-hero-bg"
          style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/hero.jpg')` }}
          aria-hidden="true"
        />
        <div className="home-hero-overlay" aria-hidden="true" />
        <Mandala className="home-hero-mandala" />

        <div className="home-hero-content">
          <div className="home-hero-badges">
            <span className="home-hero-badge">🪔 Indian Matrimony</span>
            <span className="home-hero-badge">Safe &amp; Private</span>
          </div>

          <h1 className="home-hero-headline">
            Find Your Rishta,<br />the Right Way
          </h1>

          <p className="home-hero-tagline">
            Trusted matchmaking for families from every community across India.
          </p>

          {/* CTAs change based on auth state */}
          {user ? (
            <div className="home-hero-actions">
              <Link to="/matches"   className="home-hero-cta-primary">View Your Matches</Link>
              <Link to="/dashboard" className="home-hero-cta-secondary">Go to Dashboard →</Link>
            </div>
          ) : (
            <div className="home-hero-actions">
              <Link to="/register" className="home-hero-cta-primary">Create Free Profile</Link>
              <Link to="/login"    className="home-hero-cta-secondary">Login →</Link>
            </div>
          )}
        </div>
      </div>

      {/* ── 2. BRAND LOCKUP ── */}
      <section className="home-section home-brand-section">
        <div className="home-brand-card">
          <span className="home-brand-glow" aria-hidden="true" />
          <PremSetuMark height={104} className="home-brand-mark" />
          <h2 className="home-brand-word">
            <span className="ps-logo-prem">prem</span><span className="ps-logo-setu">setu</span>
          </h2>
          <FiligreeDivider className="home-brand-divider" />
          <p className="home-brand-tagline">रिश्ता नहीं, जीवन का सेतु</p>
          <div className="home-brand-badges">
            {brandBadges.map(b => (
              <div key={b.label} className="home-brand-badge">
                <span className="home-brand-badge-icon">{b.icon}</span>
                <strong>{b.label}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. HOW IT WORKS ── */}
      <section id="how-it-works" className="home-section">
        <div className="home-section-heading">
          <span className="eyebrow">🪔 How It Works</span>
          <h2>Three steps to your match.</h2>
        </div>
        <div className="home-steps-row fest-stagger">
          {steps.map((step, i) => (
            <article key={step.title} className="home-step-card">
              <span className="step-number">0{i + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── 3.5 WHY PREMSETU ── */}
      <section className="home-section home-why-section">
        <div className="home-section-heading">
          <span className="eyebrow">🪔 Why PremSetu</span>
          <h2>Built on trust, not just matches.</h2>
        </div>
        <div className="home-why-grid fest-stagger">
          {whyFeatures.map((f) => (
            <article key={f.title} className="home-why-card">
              <span className="home-why-icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </article>
          ))}
        </div>
      </section>

      <FiligreeDivider className="home-section-divider" />

      {/* ── 4. FEATURED QUOTE ── */}
      <section id="success-stories" className="home-section home-quote-section">
        <div className="home-featured-quote">
          <p className="home-quote-stars">★★★★★</p>
          <blockquote className="home-quote-text">
            "Both families understood each other before the first call. Exactly
            how a rishta should begin."
          </blockquote>
          <p className="home-quote-credit">
            — Kavita &amp; Arjun P., Lucknow · Married 2025
          </p>
        </div>
      </section>

      {/* ── 5. BOTTOM CTA ── */}
      <section className="home-section">
        <div className="cta-banner">
          <Mandala className="cta-banner-mandala" />
          <div>
            <span className="eyebrow">Begin Your Journey</span>
            <h2>Your story is waiting to begin.</h2>
            <p>Create a free profile and start your search today.</p>
          </div>
          <div className="hero-actions">
            {user ? (
              <>
                <Link to="/matches"   className="primary-button">View Matches</Link>
                <Link to="/dashboard" className="secondary-button">Dashboard</Link>
              </>
            ) : (
              <>
                <Link to="/register" className="primary-button">Create Free Profile</Link>
                <Link to="/login"    className="secondary-button">Login</Link>
              </>
            )}
          </div>
        </div>
      </section>

    </main>
  );
};

export default Home;
