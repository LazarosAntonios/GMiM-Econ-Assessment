
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
import AdminAuth from '@/components/AdminAuth';
import AdminDashboard from '@/components/AdminDashboard';
import { Button } from "@/components/ui/button";

const Index = () => {
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleQuizComplete = (result: QuizResult) => {
    setQuizResults(prev => [...prev, result]);
    setSelectedQuiz(null);
  };

  const handleAdminToggle = () => {
    if (!isAdmin) {
      setIsAuthDialogOpen(true);
    } else {
      setIsAdmin(false);
      toast({
        title: "Admin mode disabled",
        description: "Export functionality is now hidden",
      });
    }
  };

  const handleAdminAuth = (authenticated: boolean) => {
    setIsAdmin(authenticated);
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

  // Show admin dashboard directly if in admin mode
  if (isAdmin) {
    return <AdminDashboard results={quizResults} onDisableAdmin={handleAdminToggle} />;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <AdminAuth 
        onAuthenticate={handleAdminAuth} 
        isOpen={isAuthDialogOpen} 
        onOpenChange={setIsAuthDialogOpen} 
      />

      {!studentInfo ? (
        <>
          {!showRegistration ? (
            <div className="space-y-6">
              <IntroMessage onContinue={handleContinueToRegistration} />
              
              <div className="mt-8 text-center">
                <Button 
                  onClick={handleAdminToggle} 
                  variant="outline" 
                  className="text-xs"
                >
                  Admin Login
                </Button>
              </div>
            </div>
          ) : (
            <StudentRegistration onSubmit={setStudentInfo} />
          )}
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
            </div>
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

export default Index;
