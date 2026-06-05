import { Link } from "react-router-dom";
import { LogoA } from "./Logo";

const Footer = () => (
  <footer className="site-footer">

    {/* Brand */}
    <div className="footer-card footer-brand">
      <LogoA height={28} />
      <p>
        Trusted matchmaking for families across India. Detailed profiles,
        family-first values, and private conversations that move at a
        respectful pace — for every community, every background.
      </p>
      <div className="footer-chip-row">
        <span className="chip">All Communities</span>
        <span className="chip">Trusted Matchmaking</span>
        <span className="chip">Family-first</span>
      </div>
    </div>

    {/* Quick links */}
    <div className="footer-card footer-column">
      <h4>Quick Links</h4>
      <div className="footer-link-list">
        <a href="/#how-it-works">How It Works</a>
        <a href="/#success-stories">Success Stories</a>
        <Link to="/register">Create Profile</Link>
        <Link to="/login">Login</Link>
      </div>
    </div>

    {/* Trust & Safety */}
    <div className="footer-card footer-column">
      <h4>Trust &amp; Safety</h4>
      <div className="footer-link-list">
        <Link to="/privacy">Privacy Policy</Link>
        <Link to="/terms">Terms &amp; Conditions</Link>
        <Link to="/refund">Refund Policy</Link>
        <Link to="/contact">Contact Us</Link>
      </div>
    </div>

  </footer>
);

export default Footer;
