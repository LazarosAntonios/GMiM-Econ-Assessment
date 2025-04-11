
export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number; // Index of the correct answer in options array
  explanation?: string;
  section?: string; // Added for section tracking
}

export interface Quiz {
  id: number;
  title: string;
  description: string;
  category: "managerial" | "foundational";
  duration: number; // Duration in minutes
  questions: Question[];
  isPreTest?: boolean;
  isPostTest?: boolean;
  passingScore?: number; // Score needed to pass
  sectionsConfig?: SectionsConfig; // For section-specific passing criteria
}

export interface SectionsConfig {
  sections: {
    name: string;
    passingScore: number; // Percentage needed to pass this section
  }[];
  requireAllSections: boolean; // True if all sections must pass individual thresholds
}

export interface StudentInfo {
  name: string;
  studentId: string;
}

export interface QuizResult {
  studentInfo: StudentInfo;
  quizId: number;
  quizTitle: string;
  quizCategory: "managerial" | "foundational";
  score: number;
  totalQuestions: number;
  passedSections?: string[]; // Which sections were passed
  failedSections?: string[]; // Which sections were failed
  sectionScores?: {[section: string]: {correct: number, total: number, percentage: number}};
  isEligibleForAdvanced?: boolean; // Only relevant for managerial quizzes
  date: Date;
}

export interface StudentResults {
  student: StudentInfo;
  results: QuizResult[];
}
