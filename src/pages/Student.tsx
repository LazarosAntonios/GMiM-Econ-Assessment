
import React, { useState } from 'react';
import { sampleQuizzes } from "@/data/sampleQuizzes";
import { foundationalPreTest } from "@/data/preTestQuiz";
import { foundationalPostTest } from "@/data/postTestQuiz";
import QuizSelector from "@/components/QuizSelector";
import QuizContainer from "@/components/QuizContainer";
import { Quiz, StudentInfo, QuizResult } from "@/types/quiz";
import StudentRegistration from '@/components/StudentRegistration';
import IntroMessage from '@/components/IntroMessage';
import QuizResults from '@/components/QuizResults';

const Student: React.FC = () => {
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [showRegistration, setShowRegistration] = useState(false);
  const [currentResult, setCurrentResult] = useState<QuizResult | null>(null);

  React.useEffect(() => {
    try {
      const storedResults = localStorage.getItem('studentResults');
      if (storedResults) {
        const parsedResults = JSON.parse(storedResults) as QuizResult[];
        setQuizResults(parsedResults);
      }
    } catch (error) {
      console.error("Error loading stored quiz results:", error);
    }
  }, []);

  const handleQuizComplete = (result: QuizResult) => {
    setQuizResults(prev => {
      const filteredResults = prev.filter(
        r => !(r.quizId === result.quizId && r.studentInfo.studentId === result.studentInfo.studentId)
      );
      return [...filteredResults, result];
    });
    
    setCurrentResult(result);
    setSelectedQuiz(null);
  };

  const handleContinueToRegistration = () => {
    setShowRegistration(true);
  };

  const handleBackToQuizzes = () => {
    setCurrentResult(null);
  };

  const completedQuizIds = quizResults.filter(
    result => result.studentInfo.studentId === studentInfo?.studentId
  ).map(result => result.quizId);
  
  const hasCompletedPreTest = studentInfo && completedQuizIds.includes(foundationalPreTest.id);
  
  const isEligibleForAdvanced = studentInfo && quizResults.some(result => 
    result.quizId === foundationalPreTest.id && 
    result.isEligibleForAdvanced &&
    result.studentInfo.studentId === studentInfo.studentId
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
          {currentResult ? (
            <QuizResults
              score={currentResult.score}
              totalQuestions={currentResult.totalQuestions}
              quizTitle={currentResult.quizTitle}
              quizCategory={currentResult.quizCategory}
              studentInfo={currentResult.studentInfo}
              isEligibleForAdvanced={currentResult.isEligibleForAdvanced}
              sectionScores={currentResult.sectionScores}
              passedSections={currentResult.passedSections}
              failedSections={currentResult.failedSections}
              completionDate={new Date(currentResult.date)}
              onBackToPortal={handleBackToQuizzes}
            />
          ) : !selectedQuiz ? (
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
              hasCompletedPreTest={!!hasCompletedPreTest}
              isEligibleForAdvanced={!!isEligibleForAdvanced}
              studentResults={quizResults.filter(result => result.studentInfo.studentId === studentInfo.studentId)}
              studentInfo={studentInfo}
            />
          ) : (
            <QuizContainer
              key={selectedQuiz.id}
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
