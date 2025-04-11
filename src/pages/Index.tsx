
import React, { useState } from 'react';
import { sampleQuizzes } from "@/data/sampleQuizzes";
import QuizSelector from "@/components/QuizSelector";
import QuizContainer from "@/components/QuizContainer";
import { Quiz, StudentInfo } from "@/types/quiz";
import StudentRegistration from '@/components/StudentRegistration';
import IntroMessage from '@/components/IntroMessage';

const Index = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [showIntro, setShowIntro] = useState<boolean>(false);
  
  const handleSelectQuiz = (quizId: number) => {
    const quiz = sampleQuizzes.find(q => q.id === quizId);
    if (quiz) {
      setSelectedQuiz(quiz);
    }
  };
  
  const handleBackToQuizzes = () => {
    setSelectedQuiz(null);
  };

  const handleStudentRegistration = (info: StudentInfo) => {
    setStudentInfo(info);
    setShowIntro(true);
  };

  const handleIntroContinue = () => {
    setShowIntro(false);
  };
  
  return (
    <div className="min-h-screen bg-econ-light py-8 px-4">
      {!studentInfo ? (
        <StudentRegistration onSubmit={handleStudentRegistration} />
      ) : showIntro ? (
        <IntroMessage studentInfo={studentInfo} onContinue={handleIntroContinue} />
      ) : selectedQuiz ? (
        <QuizContainer 
          quiz={selectedQuiz} 
          onBack={handleBackToQuizzes} 
          studentInfo={studentInfo}
        />
      ) : (
        <QuizSelector quizzes={sampleQuizzes} onSelectQuiz={handleSelectQuiz} />
      )}
    </div>
  );
};

export default Index;
