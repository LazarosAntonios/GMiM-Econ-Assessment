
import React, { useState } from 'react';
import { sampleQuizzes } from "@/data/sampleQuizzes";
import QuizSelector from "@/components/QuizSelector";
import QuizContainer from "@/components/QuizContainer";
import { Quiz } from "@/types/quiz";

const Index = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  
  const handleSelectQuiz = (quizId: number) => {
    const quiz = sampleQuizzes.find(q => q.id === quizId);
    if (quiz) {
      setSelectedQuiz(quiz);
    }
  };
  
  const handleBackToQuizzes = () => {
    setSelectedQuiz(null);
  };
  
  return (
    <div className="min-h-screen bg-econ-light py-8 px-4">
      {selectedQuiz ? (
        <QuizContainer quiz={selectedQuiz} onBack={handleBackToQuizzes} />
      ) : (
        <QuizSelector quizzes={sampleQuizzes} onSelectQuiz={handleSelectQuiz} />
      )}
    </div>
  );
};

export default Index;
