
import { QuizResult, StudentInfo } from "@/types/quiz";

/**
 * Converts quiz results to CSV format
 */
export const resultsToCSV = (results: QuizResult[]): string => {
  if (results.length === 0) return "";
  
  // Create CSV header
  const headers = [
    "Student ID",
    "Student Name",
    "Quiz ID",
    "Quiz Title",
    "Quiz Category",
    "Score",
    "Total Questions",
    "Percentage",
    "Pass/Fail",
    "Date",
    "Year",
    "Section Scores"
  ];
  
  // Create CSV rows
  const rows = results.map(result => {
    const date = new Date(result.date);
    const year = date.getFullYear();
    const percentage = ((result.score / result.totalQuestions) * 100).toFixed(1);
    const isPassing = (result.score / result.totalQuestions) >= (result.quizCategory === "foundational" ? 0.6 : 0.7);
    
    // Format section scores if they exist
    let sectionScoresStr = "";
    if (result.sectionScores) {
      sectionScoresStr = Object.entries(result.sectionScores)
        .map(([section, data]) => `${section}:${data.percentage}%`)
        .join("; ");
    }
    
    return [
      result.studentInfo.studentId,
      result.studentInfo.name,
      result.quizId,
      result.quizTitle,
      result.quizCategory,
      result.score,
      result.totalQuestions,
      percentage + "%",
      isPassing ? "Pass" : "Fail",
      date.toISOString().split("T")[0], // YYYY-MM-DD format
      year,
      sectionScoresStr
    ];
  });
  
  // Combine header and rows
  const csvContent = [
    headers.join(","),
    ...rows.map(row => row.join(","))
  ].join("\n");
  
  return csvContent;
};

/**
 * Triggers a download of data as a CSV file
 */
export const downloadCSV = (csvContent: string, filename: string = "quiz-results.csv"): void => {
  // Create a blob with CSV content
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  
  // Create download link
  const link = document.createElement("a");
  
  // Create object URL
  const url = URL.createObjectURL(blob);
  
  // Set link properties
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  
  // Append to document, trigger download, and remove
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Release the object URL
  URL.revokeObjectURL(url);
};
