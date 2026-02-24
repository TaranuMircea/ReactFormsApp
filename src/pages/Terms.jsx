import { Link } from "react-router-dom";
import "./LegalPages.css";

function Terms() {
  return (
    <div className="legal-page-container">
      <div className="legal-page">
        <div className="legal-hero">
          <div className="legal-hero-content">
            <h1>Termeni și Condiții</h1>
            <p className="last-updated">Ultima actualizare: Ianuarie 2025</p>
          </div>
          <img
            src="/image/StayHidden.png"
            alt="Data Protection"
            className="legal-hero-image"
          />
        </div>

        <div className="legal-content">
          <section className="legal-section">
            <h2>1. Acceptarea Termenilor</h2>
            <p>
              Prin accesarea și utilizarea acestui sondaj, ești de acord cu
              termenii și condițiile de mai jos. Dacă nu ești de acord, te rog
              să nu completezi sondajul. E simplu!
            </p>
          </section>

          <section className="legal-section">
            <h2>2. Scopul Aplicației</h2>
            <p>
              Această aplicație web este un proiect academic dezvoltat pentru
              lucrarea mea de licență. Scopul principal este:
            </p>
            <ul>
              <li>Colectarea de date pentru analiza statistică</li>
              <li>Demonstrarea competențelor tehnice în dezvoltare web</li>
              <li>Susținerea proiectului de licență cu date reale</li>
            </ul>
            <p>Nu este un serviciu comercial și nu generează profit.</p>
          </section>

          <section className="legal-section">
            <h2>3. Eligibilitate</h2>
            <p>
              Pentru a participa la acest sondaj, trebuie să ai cel puțin 16
              ani. Dacă ești minor, te rog să obții consimțământul părinților
              sau tutorelui legal înainte de a completa formularul.
            </p>
          </section>

          <section className="legal-section">
            <h2>4. Utilizarea Corectă</h2>
            <p>
              Te angajezi să folosești aplicația în mod corespunzător. Nu este
              permis:
            </p>
            <ul>
              <li>Trimiterea de răspunsuri spam sau automate</li>
              <li>
                Încercarea de a hackui sau compromite securitatea aplicației
              </li>
              <li>Folosirea de scripturi, boți sau alte metode automate</li>
              <li>Trimiterea de conținut ofensator, ilegal sau inadecvat</li>
              <li>Încercarea de a accesa date ale altor utilizatori</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>5. Proprietate Intelectuală</h2>
            <p>
              Tot codul sursă, design-ul și conținutul acestei aplicații îmi
              aparțin. Este dezvoltat ca parte a portofoliului meu academic. Nu
              ai voie să copiezi, modifici sau redistribui aplicația fără
              permisiunea mea explicită.
            </p>
            <p>
              Răspunsurile tale rămân ale tale, dar prin trimiterea lor îmi dai
              permisiunea de a le folosi în mod anonim pentru scopurile
              menționate.
            </p>
          </section>

          <section className="legal-section">
            <h2>6. Disponibilitate și Funcționalitate</h2>
            <p>
              Fac tot posibilul ca aplicația să funcționeze corect, dar fiind un
              proiect de student, pot apărea probleme tehnice. Nu garantez:
            </p>
            <ul>
              <li>Disponibilitate 24/7 (serverul poate cădea uneori)</li>
              <li>Lipsa completă de bug-uri (sunt student, nu Google)</li>
              <li>
                Suport tehnic imediat (încerc să răspund cât pot de repede)
              </li>
            </ul>
            <p>
              Dacă întâmpini probleme, te rog să-mi scrii prin formularul de
              contact.
            </p>
          </section>

          <section className="legal-section">
            <h2>7. Limitarea Răspunderii</h2>
            <p>
              Această aplicație este oferită "as is" (așa cum este). Nu sunt
              responsabil pentru:
            </p>
            <ul>
              <li>Pierderea de date din cauze tehnice</li>
              <li>Downtime sau indisponibilitatea temporară</li>
              <li>Erori în procesarea răspunsurilor</li>
              <li>Orice daune indirecte rezultate din utilizare</li>
            </ul>
            <p>E un proiect academic, nu un serviciu profesional plătit.</p>
          </section>

          <section className="legal-section">
            <h2>8. Modificări ale Termenilor</h2>
            <p>
              Îmi rezerv dreptul de a modifica acești termeni oricând.
              Modificările vor fi afișate pe această pagină cu data
              actualizării. Continuarea utilizării după modificări înseamnă că
              ești de acord cu noii termeni.
            </p>
          </section>

          <section className="legal-section">
            <h2>9. Încheierea Serviciului</h2>
            <p>
              După susținerea lucrării de licență, este posibil să închid
              aplicația sau să o las în modul read-only (doar vizualizare
              statistici). Voi anunța cu cel puțin o lună înainte dacă plănuiesc
              să șterg datele complet.
            </p>
          </section>

          <section className="legal-section">
            <h2>10. Legea Aplicabilă</h2>
            <p>
              Acești termeni sunt guvernați de legile din România. Pentru orice
              dispută, instanțele din România sunt competente. Totuși, sper să
              nu ajungem acolo - e doar un sondaj pentru licență! 😊
            </p>
          </section>

          <section className="legal-section">
            <h2>11. Contact</h2>
            <p>
              Pentru orice întrebare despre acești termeni, te rog să mă
              contactezi prin{" "}
              <Link to="/#contact" className="legal-link">
                formularul de contact
              </Link>{" "}
              de pe pagina principală.
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

export default Terms;
