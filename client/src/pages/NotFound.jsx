import { Link } from "react-router-dom";
import { PremSetuMark } from "../components/Logo";
import { FiligreeDivider } from "../components/Festive";

const NotFound = () => (
  <section className="page-shell notfound-shell">
    <div className="notfound-card">
      <span className="notfound-glow" aria-hidden="true" />
      <PremSetuMark height={84} className="notfound-mark" />
      <span className="notfound-code">404</span>
      <h1 className="notfound-title">This page took a wrong turn.</h1>
      <FiligreeDivider className="notfound-divider" />
      <p className="muted-copy">
        The link may have moved or expired. Let's get you back on the path.
      </p>
      <div className="hero-actions" style={{ justifyContent: "center" }}>
        <Link to="/" className="primary-button">Back to Home</Link>
        <Link to="/matches" className="secondary-button">Browse Profiles</Link>
      </div>
    </div>
  </section>
);

export default NotFound;
