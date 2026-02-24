import { useState } from "react";
import { updateSurveyInfo, toggleSurveyStatus } from "../firebase/server";

function SurveySettings({ survey, setSurvey, responsesCount }) {
  const [editingInfo, setEditingInfo] = useState(false);
  const [surveyInfo, setSurveyInfo] = useState({
    title: survey?.title || "",
    description: survey?.description || "",
  });

  const handleSaveSurveyInfo = async () => {
    if (!surveyInfo.title.trim()) {
      alert("Titlul nu poate fi gol!");
      return;
    }

    const result = await updateSurveyInfo(
      surveyInfo.title,
      surveyInfo.description,
    );

    if (result.success) {
      setSurvey({
        ...survey,
        title: surveyInfo.title,
        description: surveyInfo.description,
      });
      setEditingInfo(false);
      alert("Informațiile au fost salvate!");
    } else {
      alert("Eroare la salvarea informațiilor!");
    }
  };

  const handleToggleStatus = async () => {
    const newStatus = !survey.isActive;
    const result = await toggleSurveyStatus(newStatus);

    if (result.success) {
      setSurvey({ ...survey, isActive: newStatus });
      alert(`Sondajul a fost ${newStatus ? "activat" : "dezactivat"}!`);
    } else {
      alert("Eroare la schimbarea statusului!");
    }
  };

  return (
    <div className="settings-section">
      <div className="settings-card">
        <div className="settings-header">
          <h3>Informații Sondaj</h3>
          <button
            onClick={() => setEditingInfo(!editingInfo)}
            className="edit-info-btn"
          >
            {editingInfo ? "✕ Anulează" : "Editează"}
          </button>
        </div>

        {editingInfo ? (
          <div className="edit-info-form">
            <div className="form-group">
              <label>Titlu Sondaj:</label>
              <input
                type="text"
                value={surveyInfo.title}
                onChange={(e) =>
                  setSurveyInfo({ ...surveyInfo, title: e.target.value })
                }
                placeholder="Ex: Sondaj Satisfacție Clienți"
              />
            </div>

            <div className="form-group">
              <label>Descriere:</label>
              <textarea
                value={surveyInfo.description}
                onChange={(e) =>
                  setSurveyInfo({
                    ...surveyInfo,
                    description: e.target.value,
                  })
                }
                placeholder="Descrierea sondajului..."
                rows="4"
              />
            </div>

            <button onClick={handleSaveSurveyInfo} className="save-info-btn">
              Salvează Modificările
            </button>
          </div>
        ) : (
          <div className="info-display">
            <div className="info-item">
              <strong>Titlu:</strong>
              <p>{survey?.title || "Fără titlu"}</p>
            </div>
            <div className="info-item">
              <strong>Descriere:</strong>
              <p>{survey?.description || "Fără descriere"}</p>
            </div>
          </div>
        )}
      </div>

      <div className="settings-card">
        <h3>Status Sondaj</h3>
        <div className="status-toggle">
          <div className="status-info">
            <span
              className={`status-badge ${survey?.isActive ? "active" : "inactive"}`}
            >
              {survey?.isActive ? "Activ" : "Inactiv"}
            </span>
            <p className="status-description">
              {survey?.isActive
                ? "Sondajul este vizibil și poate primi răspunsuri"
                : "Sondajul este ascuns și nu primește răspunsuri"}
            </p>
          </div>
          <button
            onClick={handleToggleStatus}
            className={`toggle-btn ${survey?.isActive ? "deactivate" : "activate"}`}
          >
            {survey?.isActive ? "Dezactivează" : "Activează"}
          </button>
        </div>
      </div>

      <div className="settings-card">
        <h3>Statistici Rapide</h3>
        <div className="quick-stats">
          <div className="stat-box">
            <div className="stat-number">{survey?.questions?.length || 0}</div>
            <div className="stat-label">Întrebări</div>
          </div>
          <div className="stat-box">
            <div className="stat-number">{responsesCount}</div>
            <div className="stat-label">Răspunsuri</div>
          </div>
          <div className="stat-box">
            <div className="stat-number">
              {survey?.isActive ? "Activ" : "Inactiv"}
            </div>
            <div className="stat-label">Status</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SurveySettings;
