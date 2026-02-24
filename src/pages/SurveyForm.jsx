import { useState, useEffect } from "react";
import { fetchActiveSurvey, submitSurveyResponse } from "../firebase/server";
import { auth } from "../firebase/config";
import "./SurveyForm.css";

function SurveyForm() {
  const [survey, setSurvey] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    loadSurvey();

    // Check if user is authenticated (admin)
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAdmin(!!user);
    });

    return () => unsubscribe();
  }, []);

  const loadSurvey = async () => {
    const result = await fetchActiveSurvey();
    if (result.success) {
      // Check if survey is active
      if (result.data.isActive === false) {
        setError(
          "Acest sondaj nu este activ momentan. Te rugăm să revii mai târziu.",
        );
        setLoading(false);
        return;
      }
      setSurvey(result.data);
    } else {
      setError("Nu există niciun sondaj activ momentan.");
    }
    setLoading(false);
  };

  const handleAnswerChange = (questionId, value) => {
    if (isAdmin) return; // Admin can't change answers

    setAnswers({
      ...answers,
      [questionId]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isAdmin) {
      alert(
        "Ești autentificat ca Admin. Nu poți trimite răspunsuri în acest mod.",
      );
      return;
    }

    // Validate required questions
    const missingRequired = survey.questions.some(
      (q) => q.required && (!answers[q.id] || answers[q.id] === ""),
    );

    if (missingRequired) {
      setError("Te rugăm să completezi toate câmpurile obligatorii.");
      return;
    }

    const result = await submitSurveyResponse(answers);

    if (result.success) {
      setSubmitted(true);
      setError("");
    } else {
      setError("Eroare la trimiterea răspunsurilor.");
    }
  };

  const renderQuestion = (question) => {
    switch (question.type) {
      case "text":
        return (
          <textarea
            value={answers[question.id] || ""}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            placeholder={
              isAdmin
                ? "Preview mod - Admin nu poate completa"
                : "Răspunsul tău..."
            }
            required={question.required}
            disabled={isAdmin}
            className={isAdmin ? "disabled-input" : ""}
          />
        );

      case "multiple":
        return (
          <div className="options-group">
            {question.options &&
              question.options.map((option, index) => (
                <label
                  key={index}
                  className={`option-label ${isAdmin ? "disabled-label" : ""}`}
                >
                  <input
                    type="radio"
                    name={question.id}
                    value={option}
                    checked={answers[question.id] === option}
                    onChange={(e) =>
                      handleAnswerChange(question.id, e.target.value)
                    }
                    required={question.required}
                    disabled={isAdmin}
                  />
                  <span>{option}</span>
                </label>
              ))}
          </div>
        );

      case "scale":
        return (
          <div className="scale-group">
            <div className="scale-labels">
              <span>{question.scaleMin || 1}</span>
              <span>{question.scaleMax || 5}</span>
            </div>
            <input
              type="range"
              min={question.scaleMin || 1}
              max={question.scaleMax || 5}
              value={answers[question.id] || question.scaleMin || 1}
              onChange={(e) =>
                handleAnswerChange(question.id, parseInt(e.target.value))
              }
              required={question.required}
              className={`scale-slider ${isAdmin ? "disabled-slider" : ""}`}
              disabled={isAdmin}
            />
            <div className="scale-value">
              Valoare selectată:{" "}
              {answers[question.id] || question.scaleMin || 1}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return <div className="loading">Se încarcă sondajul...</div>;
  }

  if (submitted) {
    return (
      <div className="success-container">
        <div className="success-box">
          <div className="success-icon">✓</div>
          <h2>Mulțumim!</h2>
          <p>Răspunsurile tale au fost trimise cu succes.</p>
        </div>
      </div>
    );
  }

  if (error && !survey) {
    return <div className="error-container">{error}</div>;
  }

  return (
    <div className="survey-form-container">
      <div className="survey-form">
        {isAdmin && (
          <div className="admin-preview-banner">
            <div className="banner-icon">
              <img
                src="/image/PandaRing.png"
                alt="Panda Thank You"
                className="survey-hero-image "
              />
            </div>
            <div className="survey-hero-container">
              <strong>Mod Preview Admin</strong>
              <p className="subtitle-survey">
                Vizualizezi formularul. <br></br>Nu poți trimite răspunsuri în
                acest mod.
              </p>
            </div>
          </div>
        )}

        <div className="survey-box">
          <div className="survey-title">{survey?.title || "Sondaj"}</div>
          <p className="survey-description">{survey?.description}</p>
        </div>

        <form onSubmit={handleSubmit}>
          {survey?.questions &&
            survey.questions.map((question, index) => (
              <div key={question.id} className="question-block">
                <label className="question-label">
                  {index + 1}. {question.question}
                  {question.required && <span className="required">*</span>}
                </label>
                {renderQuestion(question)}
              </div>
            ))}

          {error && <div className="error-message">{error}</div>}

          <button
            type="submit"
            className={`submit-btn ${isAdmin ? "disabled-btn" : ""}`}
            disabled={isAdmin}
          >
            {isAdmin
              ? "🔒 Mod Preview - Trimite dezactivat"
              : "Trimite răspunsurile"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SurveyForm;
