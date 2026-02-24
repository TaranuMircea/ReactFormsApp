import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <ul className="footer-contact">
            <li>contact@perlego.ro</li>
            <li>+40 123 456 789</li>
            <li>Cluj-Napoca, România</li>
          </ul>
        </div>

        <div className="footer-section">
          <ul className="footer-links">
            <li>
              <Link to="/privacy" onClick={() => window.scrollTo(0, 0)}>
                Politică de Confidențialitate
              </Link>
            </li>
            <li>
              <Link to="/terms" onClick={() => window.scrollTo(0, 0)}>
                Termeni și Condiții
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Perlego. Toate drepturile rezervate.</p>
        <p className="footer-credits">Dezvoltat cu ❤️ în România</p>
      </div>
    </footer>
  );
}

export default Footer;
