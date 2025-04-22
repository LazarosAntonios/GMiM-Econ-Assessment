
import React, { useState } from 'react';
import { Quiz, QuizResult, StudentInfo } from '@/types/quiz';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import PreTestStatusCard from './quiz-selector/PreTestStatusCard';
import AdvancedAssessmentToggle from './quiz-selector/AdvancedAssessmentToggle';
import FoundationalQuizTab from './quiz-selector/FoundationalQuizTab';
import ManagerialQuizTab from './quiz-selector/ManagerialQuizTab';

interface QuizSelectorProps {
  quizzes: Quiz[];
  preTest: Quiz;
  postTest: Quiz;
  onSelectQuiz: (quizId: number) => void;
  hasCompletedPreTest: boolean;
  isEligibleForAdvanced: boolean;
  studentResults: QuizResult[];
  studentInfo: StudentInfo;
}

const QuizSelector: React.FC<QuizSelectorProps> = ({ 
  quizzes, 
  preTest,
  postTest,
  onSelectQuiz, 
  hasCompletedPreTest,
  isEligibleForAdvanced,
  studentResults,
  studentInfo
}) => {
  const managerialQuizzes = quizzes.filter(quiz => quiz.category === "managerial");
  // Default showManagerial to false, but let user toggle it regardless of eligibility
  const [showManagerial, setShowManagerial] = useState<boolean>(isEligibleForAdvanced);
  
  const getPreTestStatus = () => {
    const result = studentResults.find(r => r.quizId === preTest.id);
    if (!result) return null;
    
    return {
      score: result.score,
      totalQuestions: result.totalQuestions,
      percentage: Math.round((result.score / result.totalQuestions) * 100),
      isEligible: result.isEligibleForAdvanced,
      date: new Date(result.date)
    };
  };
  
  const preTestStatus = getPreTestStatus();
  
  return (
    <div className="container mx-auto py-10 animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-econ-navy mb-2">
        Economics Assessment Platform
      </h1>
      <p className="text-lg text-gray-600 text-center mb-10">
        Select a test to assess your knowledge
      </p>
      
      {/* Display Pre-Test Status if completed */}
      <PreTestStatusCard preTestStatus={preTestStatus} studentInfo={studentInfo} />
      
      {/* Always show the Advanced Assessment toggle option */}
      <AdvancedAssessmentToggle 
        isEligibleForAdvanced={isEligibleForAdvanced}
        showManagerial={showManagerial}
        setShowManagerial={setShowManagerial}
        hasCompletedPreTest={hasCompletedPreTest}
      />

      {/* Clear separation for mandatory tests section */}
      <div className="mb-8">
        <div className="flex items-center mb-6">
          <h2 className="text-xl font-bold text-econ-navy mr-3">MANDATORY ASSESSMENTS</h2>
          <Separator className="flex-grow bg-econ-navy/20" />
        </div>
      </div>
      
      <Tabs defaultValue="foundational" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="foundational">Mandatory Foundational Tests</TabsTrigger>
          {showManagerial && <TabsTrigger value="managerial">Optional Managerial Tests</TabsTrigger>}
        </TabsList>
        
        <TabsContent value="foundational">
          <FoundationalQuizTab 
            preTest={preTest}
            postTest={postTest}
            hasCompletedPreTest={hasCompletedPreTest}
            onSelectQuiz={onSelectQuiz}
            preTestStatus={preTestStatus}
          />
        </TabsContent>
        
        {showManagerial && (
          <TabsContent value="managerial">
            <ManagerialQuizTab 
              managerialQuizzes={managerialQuizzes}
              onSelectQuiz={onSelectQuiz}
            />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default QuizSelector;
