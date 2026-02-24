import "./Statistics.css";

function Statistics({ stats }) {
  if (!stats || Object.keys(stats).length === 0) {
    return <p className="no-stats">Nu există date pentru statistici.</p>;
  }

  const renderMultipleChoiceStats = (stat) => {
    const maxCount = Math.max(...Object.values(stat.data));

    return (
      <div className="stat-card">
        <h4>{stat.question}</h4>
        <p className="stat-type">Tip: Opțiuni Multiple</p>
        <div className="bar-chart">
          {Object.entries(stat.data).map(([option, count]) => {
            const percentage =
              stat.total > 0 ? ((count / stat.total) * 100).toFixed(1) : 0;
            const barWidth = maxCount > 0 ? (count / maxCount) * 100 : 0;

            return (
              <div key={option} className="bar-row">
                <div className="bar-label">{option}</div>
                <div className="bar-container">
                  <div className="bar-fill" style={{ width: `${barWidth}%` }}>
                    <span className="bar-count">{count}</span>
                  </div>
                </div>
                <div className="bar-percentage">{percentage}%</div>
              </div>
            );
          })}
        </div>
        <p className="total-responses">Total răspunsuri: {stat.total}</p>
      </div>
    );
  };

  const renderScaleStats = (stat) => {
    const maxCount = Math.max(...Object.values(stat.distribution));

    return (
      <div className="stat-card">
        <h4>{stat.question}</h4>
        <p className="stat-type">
          Tip: Scală ({stat.scaleMin} - {stat.scaleMax})
        </p>

        <div className="average-display">
          <div className="average-circle">
            <span className="average-value">{stat.average}</span>
            <span className="average-label">Medie</span>
          </div>
        </div>

        <div className="bar-chart">
          {Object.entries(stat.distribution).map(([value, count]) => {
            const percentage =
              stat.total > 0 ? ((count / stat.total) * 100).toFixed(1) : 0;
            const barWidth = maxCount > 0 ? (count / maxCount) * 100 : 0;

            return (
              <div key={value} className="bar-row">
                <div className="bar-label">{value}</div>
                <div className="bar-container">
                  <div
                    className="bar-fill scale-bar"
                    style={{ width: `${barWidth}%` }}
                  >
                    <span className="bar-count">{count}</span>
                  </div>
                </div>
                <div className="bar-percentage">{percentage}%</div>
              </div>
            );
          })}
        </div>
        <p className="total-responses">Total răspunsuri: {stat.total}</p>
      </div>
    );
  };

  const renderTextStats = (stat) => {
    const percentage =
      stat.total > 0 ? ((stat.answersCount / stat.total) * 100).toFixed(1) : 0;

    return (
      <div className="stat-card">
        <h4>{stat.question}</h4>
        <p className="stat-type">Tip: Text Liber</p>
        <div className="text-stat">
          <div className="text-stat-number">{stat.answersCount}</div>
          <div className="text-stat-label">
            răspunsuri completate din {stat.total} total
          </div>
          <div className="text-stat-percentage">{percentage}%</div>
        </div>
      </div>
    );
  };

  return (
    <div className="statistics-container">
      {Object.entries(stats).map(([questionId, stat]) => (
        <div key={questionId}>
          {stat.type === "multiple" && renderMultipleChoiceStats(stat)}
          {stat.type === "scale" && renderScaleStats(stat)}
          {stat.type === "text" && renderTextStats(stat)}
        </div>
      ))}
    </div>
  );
}

export default Statistics;
