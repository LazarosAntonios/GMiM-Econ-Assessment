
export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number; // Index of the correct answer in options array
  explanation?: string;
}

export interface Quiz {
  id: number;
  title: string;
  description: string;
  questions: Question[];
}
