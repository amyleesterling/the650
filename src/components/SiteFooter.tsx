import { Link } from "react-router-dom";
import "./SiteFooter.css";

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__mark">The 650</span>
          <p className="muted footer__tag">
            You have 650 muscles. Most of them are waiting to be noticed.
          </p>
        </div>

        <nav className="footer__links" aria-label="Footer">
          <Link to="/">The Hidden Effort</Link>
          <Link to="/muscles">Explore a Muscle</Link>
          <Link to="/why">Why Gentle &amp; Slow</Link>
          <Link to="/practice">The Practice</Link>
          <Link to="/about">About &amp; Sources</Link>
        </nav>

        <p className="footer__disclaimer muted">
          The 650 is educational and not medical advice. Gentle movement is
          broadly safe, but if you have pain, an injury, or a medical condition,
          check with a clinician before starting a new practice.
        </p>
      </div>
    </footer>
  );
}
