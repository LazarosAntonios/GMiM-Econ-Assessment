
import React, { useState } from 'react';
import { sampleQuizzes } from "@/data/sampleQuizzes";
import { foundationalPreTest } from "@/data/preTestQuiz";
import { foundationalPostTest } from "@/data/postTestQuiz";
import QuizSelector from "@/components/QuizSelector";
import QuizContainer from "@/components/QuizContainer";
import { Quiz, StudentInfo, QuizResult } from "@/types/quiz";
import StudentRegistration from '@/components/StudentRegistration';
import IntroMessage from '@/components/IntroMessage';

const Student: React.FC = () => {
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [showRegistration, setShowRegistration] = useState(false);

  const handleQuizComplete = (result: QuizResult) => {
    setQuizResults(prev => [...prev, result]);
    setSelectedQuiz(null);
  };

  const handleContinueToRegistration = () => {
    setShowRegistration(true);
  };

  // Process props for QuizSelector
  const completedQuizIds = quizResults.map(result => result.quizId);
  const hasCompletedPreTest = completedQuizIds.includes(foundationalPreTest.id);
  const isEligibleForAdvanced = quizResults.some(result => 
    result.quizId === foundationalPreTest.id && result.isEligibleForAdvanced
  );

  return (
    <div className="container mx-auto py-8 px-4">
      {!studentInfo ? (
        <>
          {!showRegistration ? (
            <IntroMessage onContinue={handleContinueToRegistration} />
          ) : (
            <StudentRegistration onSubmit={setStudentInfo} />
          )}
        </>
      ) : (
        <>
          {!selectedQuiz ? (
            <QuizSelector
              quizzes={sampleQuizzes}
              preTest={foundationalPreTest}
              postTest={foundationalPostTest}
              onSelectQuiz={(quizId) => {
                const quiz = [
                  foundationalPreTest, 
                  foundationalPostTest, 
                  ...sampleQuizzes
                ].find(q => q.id === quizId);
                if (quiz) setSelectedQuiz(quiz);
              }}
              hasCompletedPreTest={hasCompletedPreTest}
              isEligibleForAdvanced={isEligibleForAdvanced}
              studentResults={quizResults}
              studentInfo={studentInfo} // Pass studentInfo to QuizSelector
            />
          ) : (
            <QuizContainer
              quiz={selectedQuiz}
              studentInfo={studentInfo}
              onBack={() => setSelectedQuiz(null)}
              onComplete={handleQuizComplete}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Student;
