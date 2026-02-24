/**
 * Export responses as CSV
 */
export const exportToCSV = (responses, survey) => {
  if (!responses || responses.length === 0) {
    alert("Nu există răspunsuri de exportat!");
    return;
  }

  // Create CSV header
  const headers = ["ID Răspuns", "Data"];
  survey.questions.forEach((q) => {
    headers.push(q.question);
  });

  // Create CSV rows
  const rows = responses.map((response) => {
    const row = [
      response.id,
      response.submittedAt?.toDate().toLocaleString("ro-RO") || "N/A",
    ];

    survey.questions.forEach((q) => {
      row.push(response.answers?.[q.id] || "");
    });

    return row;
  });

  // Combine headers and rows
  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
  ].join("\n");

  // Create download
  const blob = new Blob(["\ufeff" + csvContent], {
    type: "text/csv;charset=utf-8;",
  });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `raspunsuri_sondaj_${new Date().toISOString().split("T")[0]}.csv`,
  );
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Export responses as JSON
 */
export const exportToJSON = (responses, survey) => {
  if (!responses || responses.length === 0) {
    alert("Nu există răspunsuri de exportat!");
    return;
  }

  const exportData = {
    survey: {
      title: survey.title,
      description: survey.description,
      questions: survey.questions,
    },
    responses: responses.map((response) => ({
      id: response.id,
      submittedAt: response.submittedAt?.toDate().toISOString() || null,
      answers: response.answers,
    })),
    exportedAt: new Date().toISOString(),
    totalResponses: responses.length,
  };

  const jsonString = JSON.stringify(exportData, null, 2);
  const blob = new Blob([jsonString], { type: "application/json" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `raspunsuri_sondaj_${new Date().toISOString().split("T")[0]}.json`,
  );
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
