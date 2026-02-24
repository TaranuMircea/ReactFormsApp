import { Link } from "react-router-dom";
import "./LegalPages.css";

function Privacy() {
  return (
    <div className="legal-page-container">
      <div className="legal-page">
        <div className="legal-hero">
          <div className="legal-hero-content">
            <h1>Politică de Confidențialitate</h1>
            <p className="last-updated">Ultima actualizare: Ianuarie 2025</p>
          </div>
          <img
            src="/image/DataProtect.png"
            alt="Data Protection"
            className="legal-hero-image"
          />
        </div>

        <div className="legal-content">
          <section className="legal-section">
            <h2>1. Introducere</h2>
            <p>
              Bună! Îți mulțumesc că ai ajuns până aici. Vreau să fiu complet
              transparent despre cum sunt folosite datele tale în acest sondaj.
              E un proiect personal pentru licență, deci nimic comercial sau
              suspect.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. Ce Date Colectez</h2>
            <p>
              Colectez doar răspunsurile tale la întrebările din sondaj. Punct.
              Nu salvez:
            </p>
            <ul>
              <li>Nume sau prenume</li>
              <li>Adresă de email</li>
              <li>Adresă IP</li>
              <li>Locație geografică</li>
              <li>Informații despre dispozitivul tău</li>
              <li>Cookies sau alte tehnologii de tracking</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>3. Contact</h2>
            <p>
              Dacă ai întrebări, te rog să mă contactezi prin formularul de
              contact de pe pagina principală.
            </p>
          </section>
        </div>

        <div className="legal-footer">
          <Link
            to="/#top"
            className="back-button"
            onClick={() => window.scrollTo(0, 0)}
          >
            ← Înapoi la Pagina Principală
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Privacy;
