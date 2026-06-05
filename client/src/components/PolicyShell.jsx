// TEMPLATE — This content is a starting-point template and must be reviewed
// by a qualified lawyer familiar with Indian law before going live.

import { Link } from "react-router-dom";

// Highlights unfilled placeholder text so the team can spot them at a glance.
export const PH = ({ children }) => (
  <span className="policy-placeholder">{children}</span>
);

const PolicyShell = ({ title, subtitle, lastUpdated, children }) => (
  <main className="policy-shell">
    <div className="policy-container">
      <div className="policy-template-warning">
        ⚠ TEMPLATE — This page is a draft. Have it reviewed and customised by a
        lawyer before going live. Replace all{" "}
        <span className="policy-placeholder">highlighted placeholders</span>{" "}
        with real business details.
      </div>

      <header className="policy-header">
        <span className="eyebrow">Legal</span>
        <h1>{title}</h1>
        {subtitle && <p className="policy-subtitle">{subtitle}</p>}
        <p className="policy-last-updated">Last updated: {lastUpdated}</p>
      </header>

      <div className="policy-body">{children}</div>

      <div className="policy-footer-nav">
        <Link to="/" className="secondary-button">
          ← Back to Home
        </Link>
      </div>
    </div>
  </main>
);

export const PolicySection = ({ title, children }) => (
  <section className="policy-section">
    <h2>{title}</h2>
    {children}
  </section>
);

export default PolicyShell;
