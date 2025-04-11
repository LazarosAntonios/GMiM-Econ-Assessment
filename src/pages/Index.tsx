
import React, { useState, useEffect } from 'react';
import { sampleQuizzes } from "@/data/sampleQuizzes";
import { foundationalPreTest } from "@/data/preTestQuiz";
import { foundationalPostTest } from "@/data/postTestQuiz";
import QuizSelector from "@/components/QuizSelector";
import QuizContainer from "@/components/QuizContainer";
import { Quiz, StudentInfo, QuizResult } from "@/types/quiz";
import StudentRegistration from '@/components/StudentRegistration';
import IntroMessage from '@/components/IntroMessage';
import { useToast } from "@/hooks/use-toast";
import DownloadResults from '@/components/DownloadResults';
import { Button } from "@/components/ui/button";

const Index = () => {
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();

  const handleQuizComplete = (result: QuizResult) => {
    setQuizResults(prev => [...prev, result]);
    setSelectedQuiz(null);
  };

  const handleAdminToggle = () => {
    setIsAdmin(!isAdmin);
    toast({
      title: isAdmin ? "Admin mode disabled" : "Admin mode enabled",
      description: isAdmin 
        ? "Export functionality is now hidden" 
        : "You can now export quiz results",
    });
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
          <IntroMessage />
          <StudentRegistration onSubmit={setStudentInfo} />
          <div className="mt-8 text-center">
            <Button 
              onClick={handleAdminToggle} 
              variant="outline" 
              className="text-xs"
            >
              {isAdmin ? "Disable Admin Mode" : "Enable Admin Mode"}
            </Button>
          </div>
        </>
      ) : (
        <>
          {!selectedQuiz ? (
            <div className="space-y-6">
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
              />
              
              <div className="mt-8">
                <DownloadResults 
                  results={quizResults} 
                  studentId={studentInfo.studentId} 
                  isAdmin={isAdmin}
                />
              </div>
            </div>
          ) : (
            <QuizContainer
              quiz={selectedQuiz}
              studentInfo={studentInfo}
              onBack={() => setSelectedQuiz(null)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Index;
