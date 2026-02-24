import { useState, useEffect } from "react";
import {
  fetchActiveSurvey,
  fetchAllResponses,
  calculateStatistics,
} from "../firebase/server";

import SurveySettings from "../components/SurveySettings";
import QuestionsManager from "../components/QuestionsManager";
import ResponsesViewer from "../components/ResponsesViewer";
import Statistics from "../components/Statistics";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [survey, setSurvey] = useState(null);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("settings");
  const [stats, setStats] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const surveyResult = await fetchActiveSurvey();
    if (surveyResult.success) {
      setSurvey(surveyResult.data);

      const responsesResult = await fetchAllResponses();
      if (responsesResult.success) {
        setResponses(responsesResult.data);

        // Calculate statistics
        if (surveyResult.data.questions) {
          const calculatedStats = calculateStatistics(
            responsesResult.data,
            surveyResult.data.questions,
          );
          setStats(calculatedStats);
        }
      }
    }

    setLoading(false);
  };

  if (loading) {
    return <div className="loading">Se încarcă...</div>;
  }

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <div className="tabs">
        <button
          className={activeTab === "settings" ? "tab active" : "tab"}
          onClick={() => setActiveTab("settings")}
        >
          Setări Sondaj
        </button>
        <button
          className={activeTab === "questions" ? "tab active" : "tab"}
          onClick={() => setActiveTab("questions")}
        >
          Întrebări ({survey?.questions?.length || 0})
        </button>
        <button
          className={activeTab === "responses" ? "tab active" : "tab"}
          onClick={() => setActiveTab("responses")}
        >
          Răspunsuri ({responses.length})
        </button>
        <button
          className={activeTab === "statistics" ? "tab active" : "tab"}
          onClick={() => setActiveTab("statistics")}
        >
          Statistici
        </button>
      </div>

      {activeTab === "settings" && (
        <SurveySettings
          survey={survey}
          setSurvey={setSurvey}
          responsesCount={responses.length}
        />
      )}

      {activeTab === "questions" && (
        <QuestionsManager
          survey={survey}
          setSurvey={setSurvey}
          responses={responses}
          setStats={setStats}
        />
      )}

      {activeTab === "responses" && (
        <ResponsesViewer
          survey={survey}
          responses={responses}
          setResponses={setResponses}
          setStats={setStats}
        />
      )}

      {activeTab === "statistics" && (
        <div className="statistics-section">
          <h3>Statistici Sondaj</h3>
          {responses.length > 0 ? (
            <Statistics stats={stats} />
          ) : (
            <p className="no-stats">
              Nu există răspunsuri pentru a genera statistici.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
