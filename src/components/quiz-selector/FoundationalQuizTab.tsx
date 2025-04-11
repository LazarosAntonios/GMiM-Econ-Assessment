
import React from 'react';
import { Quiz, QuizResult } from '@/types/quiz';
import PreTestSection from './PreTestSection';
import PostTestSection from './PostTestSection';

interface FoundationalQuizTabProps {
  preTest: Quiz;
  postTest: Quiz;
  hasCompletedPreTest: boolean;
  onSelectQuiz: (id: number) => void;
  preTestStatus: {
    score: number;
    totalQuestions: number;
    percentage: number;
    isEligible: boolean;
    date: Date;
  } | null;
}

const FoundationalQuizTab: React.FC<FoundationalQuizTabProps> = ({ 
  preTest, 
  postTest, 
  hasCompletedPreTest, 
  onSelectQuiz,
  preTestStatus
}) => {
  return (
    <>
      <PreTestSection 
        preTest={preTest}
        onSelectQuiz={onSelectQuiz}
        hasCompletedPreTest={hasCompletedPreTest}
        preTestStatus={preTestStatus}
      />
      
      <PostTestSection 
        postTest={postTest}
        onSelectQuiz={onSelectQuiz}
      />
    </>
  );
};

export default FoundationalQuizTab;
