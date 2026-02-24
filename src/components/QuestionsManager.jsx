import { useState } from "react";
import {
  addQuestion,
  editQuestion,
  deleteQuestion,
  reorderQuestions,
  calculateStatistics,
} from "../firebase/server";

function QuestionsManager({ survey, setSurvey, responses, setStats }) {
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [questionData, setQuestionData] = useState({
    question: "",
    type: "text",
    required: true,
    options: [""],
    scaleMin: 1,
    scaleMax: 5,
  });

  const handleMoveQuestion = async (index, direction) => {
    const newIndex = direction === "up" ? index - 1 : index + 1;

    if (newIndex < 0 || newIndex >= survey.questions.length) return;

    const result = await reorderQuestions(survey.questions, index, newIndex);

    if (result.success) {
      setSurvey({ ...survey, questions: result.data });
    } else {
      alert("Eroare la reordonarea întrebărilor!");
    }
  };

  const handleAddOption = () => {
    setQuestionData({
      ...questionData,
      options: [...questionData.options, ""],
    });
  };

  const handleRemoveOption = (index) => {
    const newOptions = questionData.options.filter((_, i) => i !== index);
    setQuestionData({
      ...questionData,
      options: newOptions,
    });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...questionData.options];
    newOptions[index] = value;
    setQuestionData({
      ...questionData,
      options: newOptions,
    });
  };

  const handleSaveQuestion = async () => {
    if (!questionData.question.trim()) {
      alert("Întrebarea nu poate fi goală!");
      return;
    }

    if (
      questionData.type === "multiple" &&
      questionData.options.filter((o) => o.trim()).length < 2
    ) {
      alert("Adaugă cel puțin 2 opțiuni!");
      return;
    }

    let result;
    if (editingQuestion) {
      result = await editQuestion(
        survey.questions,
        editingQuestion.id,
        questionData,
      );
    } else {
      result = await addQuestion(survey.questions || [], questionData);
    }

    if (result.success) {
      setSurvey({ ...survey, questions: result.data });
      resetQuestionForm();
      // Recalculate stats
      if (responses.length > 0) {
        const newStats = calculateStatistics(responses, result.data);
        setStats(newStats);
      }
    } else {
      alert("Eroare la salvarea întrebării!");
    }
  };

  const handleEditQuestion = (question) => {
    setEditingQuestion(question);
    setQuestionData({
      question: question.question,
      type: question.type,
      required: question.required,
      options: question.options || [""],
      scaleMin: question.scaleMin || 1,
      scaleMax: question.scaleMax || 5,
    });
    setShowQuestionForm(true);
    scrollTo(0, 200);
  };

  const handleDeleteQuestion = async (questionId) => {
    if (!window.confirm("Sigur vrei să ștergi această întrebare?")) return;

    const result = await deleteQuestion(survey.questions, questionId);

    if (result.success) {
      setSurvey({ ...survey, questions: result.data });
      // Recalculate stats
      if (responses.length > 0) {
        const newStats = calculateStatistics(responses, result.data);
        setStats(newStats);
      }
    } else {
      alert("Eroare la ștergerea întrebării!");
    }
  };

  const resetQuestionForm = () => {
    setShowQuestionForm(false);
    setEditingQuestion(null);
    setQuestionData({
      question: "",
      type: "text",
      required: true,
      options: [""],
      scaleMin: 1,
      scaleMax: 5,
    });
  };

  return (
    <div className="questions-section">
      <button
        className="add-question-btn"
        onClick={() => setShowQuestionForm(!showQuestionForm)}
      >
        {showQuestionForm ? "✕ Anulează" : "+ Adaugă Întrebare"}
      </button>

      {showQuestionForm && (
        <div className="question-form">
          <h3>{editingQuestion ? "Editează Întrebare" : "Întrebare Nouă"}</h3>

          <div className="form-group">
            <label>Întrebarea:</label>
            <input
              type="text"
              value={questionData.question}
              onChange={(e) =>
                setQuestionData({
                  ...questionData,
                  question: e.target.value,
                })
              }
              placeholder="Scrie întrebarea aici..."
            />
          </div>

          <div className="form-group">
            <label>Tip:</label>
            <select
              value={questionData.type}
              onChange={(e) =>
                setQuestionData({ ...questionData, type: e.target.value })
              }
            >
              <option value="text">Text liber</option>
              <option value="multiple">Opțiuni multiple</option>
              <option value="scale">Scală</option>
            </select>
          </div>

          {questionData.type === "multiple" && (
            <div className="form-group">
              <label>Opțiuni:</label>
              {questionData.options.map((option, index) => (
                <div key={index} className="option-input">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`Opțiunea ${index + 1}`}
                  />
                  {questionData.options.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveOption(index)}
                      className="remove-option-btn"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddOption}
                className="add-option-btn"
              >
                + Adaugă Opțiune
              </button>
            </div>
          )}

          {questionData.type === "scale" && (
            <div className="form-group">
              <label>Scală de la:</label>
              <div className="scale-inputs">
                <input
                  type="number"
                  value={questionData.scaleMin}
                  onChange={(e) =>
                    setQuestionData({
                      ...questionData,
                      scaleMin: parseInt(e.target.value),
                    })
                  }
                  style={{ width: "80px" }}
                />
                <span>până la</span>
                <input
                  type="number"
                  value={questionData.scaleMax}
                  onChange={(e) =>
                    setQuestionData({
                      ...questionData,
                      scaleMax: parseInt(e.target.value),
                    })
                  }
                  style={{ width: "80px" }}
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={questionData.required}
                onChange={(e) =>
                  setQuestionData({
                    ...questionData,
                    required: e.target.checked,
                  })
                }
              />
              <span>Răspuns obligatoriu</span>
            </label>
          </div>

          <div className="form-actions">
            <button onClick={handleSaveQuestion} className="save-btn">
              {editingQuestion ? "Salvează Modificări" : "Adaugă Întrebarea"}
            </button>
            <button onClick={resetQuestionForm} className="cancel-btn">
              Anulează
            </button>
          </div>
        </div>
      )}

      <div className="questions-list">
        <h3>Întrebări Existente:</h3>
        {survey?.questions && survey.questions.length > 0 ? (
          survey.questions.map((q, index) => (
            <div key={q.id} className="question-item">
              <div className="question-order-controls">
                <button
                  onClick={() => handleMoveQuestion(index, "up")}
                  disabled={index === 0}
                  className="order-btn order-up"
                  title="Mută în sus"
                >
                  ↑
                </button>
                <button
                  onClick={() => handleMoveQuestion(index, "down")}
                  disabled={index === survey.questions.length - 1}
                  className="order-btn order-down"
                  title="Mută în jos"
                >
                  ↓
                </button>
              </div>
              <div className="question-content">
                <div className="question-header">
                  <span className="question-number">{index + 1}.</span>
                  <span className="question-text">{q.question}</span>
                  <span className="question-type-badge">{q.type}</span>
                </div>
                {q.type === "multiple" && (
                  <ul className="question-options">
                    {q.options?.map((opt, i) => (
                      <li key={i}>{opt}</li>
                    ))}
                  </ul>
                )}
                {q.type === "scale" && (
                  <div className="question-scale">
                    Scală: {q.scaleMin} - {q.scaleMax}
                  </div>
                )}
                <div className="question-actions">
                  <button
                    onClick={() => handleEditQuestion(q)}
                    className="edit-btn"
                  >
                    ✏️ Editează
                  </button>
                  <button
                    onClick={() => handleDeleteQuestion(q.id)}
                    className="delete-btn"
                  >
                    Șterge
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-questions">
            Nu există întrebări. Adaugă prima întrebare!
          </p>
        )}
      </div>
    </div>
  );
}

export default QuestionsManager;
