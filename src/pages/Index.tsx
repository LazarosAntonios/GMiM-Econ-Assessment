
import React, { useState, useEffect } from 'react';
import { sampleQuizzes } from "@/data/sampleQuizzes";
import { foundationalPreTest } from "@/data/preTestQuiz";
import QuizSelector from "@/components/QuizSelector";
import QuizContainer from "@/components/QuizContainer";
import { Quiz, StudentInfo, QuizResult } from "@/types/quiz";
import StudentRegistration from '@/components/StudentRegistration';
import IntroMessage from '@/components/IntroMessage';
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [showIntro, setShowIntro] = useState<boolean>(false);
  const [storedResults, setStoredResults] = useState<QuizResult[]>([]);
  const { toast } = useToast();
  
  // On mount, check if we have student info and results stored
  useEffect(() => {
    const savedStudentInfo = localStorage.getItem('studentInfo');
    const savedResults = localStorage.getItem('studentResults');
    
    if (savedStudentInfo) {
      try {
        const parsedInfo = JSON.parse(savedStudentInfo);
        setStudentInfo(parsedInfo);
      } catch (error) {
        console.error("Failed to parse stored student info:", error);
      }
    }
    
    if (savedResults) {
      try {
        const parsedResults = JSON.parse(savedResults);
        setStoredResults(parsedResults);
      } catch (error) {
        console.error("Failed to parse stored quiz results:", error);
      }
    }
  }, []);
  
  const handleSelectQuiz = (quizId: number) => {
    // Check if this is the pre-test (id 101) and if it's already been taken
    if (quizId === 101 && hasCompletedPreTest) {
      toast({
        title: "Pre-Test Already Completed",
        description: "You've already completed the pre-test and cannot retake it.",
        variant: "destructive"
      });
      return;
    }
    
    // Check if this is the pre-test (id 101)
    if (quizId === 101) {
      setSelectedQuiz(foundationalPreTest);
      return;
    }
    
    // Handle post-test with ID 201
    if (quizId === 201) {
      // You can define a post-test quiz here or use a placeholder for now
      const postTest = {
        ...foundationalPreTest,
        id: 201,
        title: "Foundational Economics Post-Test",
        description: "Final assessment to evaluate your understanding of foundational economic concepts after completing the course."
      };
      setSelectedQuiz(postTest);
      return;
    }
    
    const quiz = sampleQuizzes.find(q => q.id === quizId);
    if (quiz) {
      setSelectedQuiz(quiz);
    }
  };
  
  const handleBackToQuizzes = () => {
    // Refresh stored results when going back to quiz selector
    const savedResults = localStorage.getItem('studentResults');
    if (savedResults) {
      try {
        const parsedResults = JSON.parse(savedResults);
        setStoredResults(parsedResults);
      } catch (error) {
        console.error("Failed to parse stored quiz results:", error);
      }
    }
    
    setSelectedQuiz(null);
  };

  const handleStudentRegistration = (info: StudentInfo) => {
    setStudentInfo(info);
    setShowIntro(true);
    
    // Store student info in localStorage
    localStorage.setItem('studentInfo', JSON.stringify(info));
    
    toast({
      title: "Welcome!",
      description: `Hello ${info.name}, your information has been registered.`,
    });
  };

  const handleIntroContinue = () => {
    setShowIntro(false);
  };
  
  // Check if student has already completed the pre-test
  const hasCompletedPreTest = storedResults.some(result => result.quizId === foundationalPreTest.id);
  
  // Check eligibility status based on results
  const isEligibleForAdvanced = storedResults.some(result => result.isEligibleForAdvanced);
  
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
        <QuizSelector 
          quizzes={sampleQuizzes}
          preTest={foundationalPreTest}
          onSelectQuiz={handleSelectQuiz} 
          hasCompletedPreTest={hasCompletedPreTest}
          isEligibleForAdvanced={isEligibleForAdvanced}
          studentResults={storedResults}
        />
      )}
    </div>
  );
};

export default Index;
