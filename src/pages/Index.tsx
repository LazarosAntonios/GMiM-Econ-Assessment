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

const Index = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [showIntro, setShowIntro] = useState<boolean>(false);
  const [storedResults, setStoredResults] = useState<QuizResult[]>([]);
  const { toast } = useToast();
  
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
    if (quizId === 101 && hasCompletedPreTest) {
      toast({
        title: "Pre-Test Already Completed",
        description: "You've already completed the pre-test and cannot retake it.",
        variant: "destructive"
      });
      return;
    }
    
    if (quizId === 101) {
      setSelectedQuiz(foundationalPreTest);
      return;
    }
    
    if (quizId === 201) {
      setSelectedQuiz(foundationalPostTest);
      return;
    }
    
    const quiz = sampleQuizzes.find(q => q.id === quizId);
    if (quiz) {
      setSelectedQuiz(quiz);
    }
  };
  
  const handleBackToQuizzes = () => {
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
    
    localStorage.setItem('studentInfo', JSON.stringify(info));
    
    toast({
      title: "Welcome!",
      description: `Hello ${info.name}, your information has been registered.`,
    });
  };

  const handleIntroContinue = () => {
    setShowIntro(false);
  };
  
  const hasCompletedPreTest = storedResults.some(result => result.quizId === foundationalPreTest.id);
  
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
        <div className="space-y-6">
          <QuizSelector 
            quizzes={sampleQuizzes}
            preTest={foundationalPreTest}
            postTest={foundationalPostTest}
            onSelectQuiz={handleSelectQuiz} 
            hasCompletedPreTest={hasCompletedPreTest}
            isEligibleForAdvanced={isEligibleForAdvanced}
            studentResults={storedResults}
          />
          
          {studentInfo && storedResults.length > 0 && (
            <div className="max-w-3xl mx-auto mt-8 p-4 bg-white rounded-lg shadow-md">
              <h3 className="text-lg font-medium mb-4">Export Your Results</h3>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  Download all your quiz results in CSV format for analysis
                </p>
                <DownloadResults 
                  results={storedResults} 
                  studentId={studentInfo.studentId}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Index;
