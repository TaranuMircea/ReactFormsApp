import { useState } from "react";
import { submitContactForm } from "../api/api";
import "./ContactForm.css";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear status when user starts typing again
    if (status.message) {
      setStatus({ type: "", message: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    const result = await submitContactForm(
      formData.name,
      formData.email,
      formData.message,
    );

    setLoading(false);

    if (result.success) {
      setStatus({
        type: "success",
        message: "Mesajul tău a fost trimis cu succes!",
      });
      // Reset form
      setFormData({ name: "", email: "", message: "" });
    } else {
      setStatus({
        type: "error",
        message: result.error || "A apărut o eroare. Te rog încearcă din nou.",
      });
    }
  };

  return (
    <div className="contact-form-container">
      <h2>Contactează-ne</h2>
      <p className="contact-description">
        Ai întrebări sau sugestii? Scrie-ne și îți vom răspunde cât mai curând!
      </p>

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Nume:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Introdu numele tău"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="exemplu@email.com"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Mesaj:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Scrie mesajul tău aici..."
            rows="5"
            disabled={loading}
          />
        </div>

        {status.message && (
          <div className={`status-message ${status.type}`}>
            {status.message}
          </div>
        )}

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Se trimite..." : "Trimite Mesaj"}
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
