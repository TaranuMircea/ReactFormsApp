import { Link } from "react-router-dom";
import { useState } from "react";
import ContactForm from "../components/ContactForm";
import "./Home.css";

function Home() {
  const [openDropdown, setOpenDropdown] = useState(null);

  const features = [
    {
      title: "Simplu de Folosit",
      description:
        "Nu ai nevoie de cunoștințe tehnice. Doar răspunzi la întrebări și apeși submit - cam atât!",
    },
    {
      title: "Complet Anonim",
      description:
        "Nu colectez email-uri, nume sau alte date personale. Chiar deloc. Promise!",
    },
    {
      title: "Rezultate Transparente",
      description:
        "După ce trimiți răspunsurile, poți vedea statisticile generale dacă ești curios.",
    },
    {
      title: "Stocare Sigură",
      description:
        "Folosesc Firebase ca să păstrez răspunsurile în siguranță pentru examenul meu.",
    },
  ];

  const benefits = [
    "E un proiect personal pentru disertație - nu e nimic comercial",
    "Durează maxim 5 minute să completezi",
    "Răspunsurile tale mă ajută foarte mult",
    "Funcționează pe telefon, tabletă și calculator",
    "Dacă ai probleme, lasă-mi un mesaj în contact",
  ];

  const faqItems = [
    {
      question: "De ce ai nevoie de sondajul ăsta?",
      answer:
        "E pentru examenul meu de disertație. Am nevoie de date reale ca să pot analiza și prezenta rezultate în lucrare. Cu cât mai multe răspunsuri, cu atât mai bine pentru mine!",
    },
    {
      question: "Chiar e anonim?",
      answer:
        "Da! Nu salvez absolut nicio informație care te-ar putea identifica. Nici măcar IP-ul. Vreau doar răspunsurile la întrebări, nimic personal.",
    },
    {
      question: "Ce se întâmplă cu datele mele?",
      answer:
        "Le folosesc strict pentru lucrarea de disertație. O să fac grafice, statistici și analize. După susținere, probabil o să le păstrez un timp pentru portofoliu, dar în continuare anonim.",
    },
    {
      question: "Pot să văd ce au răspuns alții?",
      answer:
        "Nu! Răspunsurile sunt anonime și nu există o secțiune publică cu rezultate. Dacă ești curios, pot să-ți trimit un rezumat după ce termin disertația.",
    },
    {
      question: "Cât timp îmi ia?",
      answer:
        "Între 3-5 minute, în funcție de cât de detaliat vrei să răspunzi la întrebările deschise. Nu e nevoie să scrii eseuri, câteva propoziții sunt ok.",
    },
    {
      question: "Ce fac dacă găsesc o eroare?",
      answer:
        "Trimite-mi un mesaj prin formularul de contact de mai jos! O să încerc să rezolv problema cât mai repede.",
    },
  ];

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <div className="home">
      <div className="hero">
        <div className="hero-content">
          <h1>Bun venit! </h1>
          <p className="subtitle">
            Completează un sondaj pentru lucrarea mea de{" "}
            <b font color="#FF5733">
              {" "}
              Disertație
            </b>{" "}
            - îți ia doar câteva minute!
          </p>
        </div>

        <img
          src="/image/Panda_Thankyou.png"
          alt="Panda Thank You"
          className="hero-image"
        />
      </div>
      <div className="divider"></div>

      <div className="intro-section">
        <h2>Despre ce e vorba?</h2>
        <p>
          Salut! Sunt student și lucrez la proiectul de disertație. Am creat
          acest sondaj ca să colectez date reale pentru analiza mea.
          Răspunsurile tale mă ajută enorm, și nu durează mult - promit!
        </p>
        <p>
          Tot ce trebuie să faci e să răspunzi sincer la câteva întrebări. Nu
          există răspunsuri corecte sau greșite, vreau doar să văd ce gândesc
          oamenii real.
        </p>
      </div>

      <div className="divider"></div>

      <div className="features-section">
        <h2>Ce ar trebui să știi</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="divider"></div>

      <div className="benefits-section">
        <h2>De ce să participi?</h2>
        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <div key={index} className="benefit-item">
              <span>{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="divider"></div>

      <div className="hero">
        <img
          src="/image/Help.png"
          alt="Panda Thank You"
          className="hero-image"
        />
        <div className="cta-content">
          <h2 className="cta-h1">Hai să începem!</h2>
          <p className="cta-text">
            Click pe butonul de mai jos și completează sondajul. <br></br>
            Serios, mă ajuți mult!
          </p>

          <Link to="/survey" className="cta-button">
            Completează Sondajul
          </Link>
        </div>
      </div>

      <div className="divider"></div>

      <div className="dropdown-section">
        <h2>Întrebări Frecvente</h2>
        <div className="faq-container">
          {faqItems.map((item, index) => (
            <div key={index} className="faq-item">
              <button
                className={`faq-question ${openDropdown === index ? "active" : ""}`}
                onClick={() => toggleDropdown(index)}
              >
                <span>{item.question}</span>
                <span className="arrow">
                  {openDropdown === index ? "▲" : "▼"}
                </span>
              </button>
              <div
                className={`faq-answer ${openDropdown === index ? "open" : ""}`}
              >
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="divider"></div>

      <div className="contact-section" id="contact">
        <ContactForm />
      </div>
    </div>
  );
}

export default Home;
