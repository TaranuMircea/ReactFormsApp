import { deleteAllResponses } from "../firebase/server";
import { exportToCSV, exportToJSON } from "../utils/exportData";

function ResponsesViewer({ survey, responses, setResponses, setStats }) {
  const handleDeleteAllResponses = async () => {
    const confirmed = window.confirm(
      `Sigur vrei să ștergi TOATE răspunsurile (${responses.length} total)? Această acțiune nu poate fi anulată!`,
    );

    if (!confirmed) return;

    const result = await deleteAllResponses();

    if (result.success) {
      alert(`${result.deletedCount} răspunsuri au fost șterse cu succes!`);
      setResponses([]);
      setStats({});
    } else {
      alert("Eroare la ștergerea răspunsurilor!");
    }
  };

  const handleExportCSV = () => {
    exportToCSV(responses, survey);
  };

  const handleExportJSON = () => {
    exportToJSON(responses, survey);
  };

  return (
    <div className="responses-section">
      <div className="responses-header">
        <h3>Toate Răspunsurile ({responses.length})</h3>
        <div className="responses-actions">
          <button onClick={handleExportCSV} className="export-btn csv-btn">
            Export CSV
          </button>
          <button onClick={handleExportJSON} className="export-btn json-btn">
            Export JSON
          </button>
          <button
            onClick={handleDeleteAllResponses}
            className="delete-all-btn"
            disabled={responses.length === 0}
          >
            Șterge Toate
          </button>
        </div>
      </div>

      {responses.length > 0 ? (
        <div className="responses-list">
          {responses.map((response, index) => (
            <div key={response.id} className="response-item">
              <h4>Răspuns #{index + 1}</h4>
              <p className="response-date">
                Data:{" "}
                {response.submittedAt?.toDate().toLocaleString("ro-RO") ||
                  "N/A"}
              </p>
              <div className="response-answers">
                {survey?.questions?.map((q) => (
                  <div key={q.id} className="answer-row">
                    <strong>{q.question}</strong>
                    <p>{response.answers?.[q.id] || "Fără răspuns"}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-responses">Nu există răspunsuri încă.</p>
      )}
    </div>
  );
}

export default ResponsesViewer;
