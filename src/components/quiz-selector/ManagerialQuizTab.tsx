
import React from 'react';
import { Quiz } from '@/types/quiz';
import QuizCard from './QuizCard';

interface ManagerialQuizTabProps {
  managerialQuizzes: Quiz[];
  onSelectQuiz: (id: number) => void;
}

const ManagerialQuizTab: React.FC<ManagerialQuizTabProps> = ({ managerialQuizzes, onSelectQuiz }) => {
  return (
    <>
      <div className="bg-blue-50 border-l-4 border-blue-500 p-3 mb-4">
        <h3 className="font-bold text-blue-700">Optional Advanced Assessments</h3>
        <p className="text-sm text-blue-600">These optional assessments are available to all students who have completed the pre-test</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {managerialQuizzes.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} onSelectQuiz={onSelectQuiz} />
        ))}
      </div>
    </>
  );
};

export default ManagerialQuizTab;
