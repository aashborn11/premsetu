import { Link } from "react-router-dom";
import { LogoA } from "./Logo";

const Footer = () => (
  <footer className="site-footer">

    {/* Brand */}
    <div className="footer-card footer-brand">
      <LogoA height={30} />
      <p>Trusted matchmaking for every community across India.</p>
      <p className="footer-tagline-hi">रिश्ता नहीं, जीवन का सेतु</p>
      <div className="footer-chip-row">
        <span className="chip">All Communities</span>
        <span className="chip">Family-first</span>
        <span className="chip">Privacy-first</span>
      </div>
    </div>

    {/* Explore */}
    <div className="footer-card footer-column">
      <h4>Explore</h4>
      <div className="footer-link-list">
        <a href="/#how-it-works">How It Works</a>
        <Link to="/matches">Browse Profiles</Link>
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

    {/* Bottom bar — spans full width */}
    <div className="footer-bottom">
      <span>© {new Date().getFullYear()} PremSetu. All rights reserved.</span>
      <span className="footer-bottom-mid">Made with <span className="footer-heart">♥</span> in India 🇮🇳</span>
      <span>🔒 Secure payments by Razorpay</span>
    </div>

  </footer>
);

export default Footer;
