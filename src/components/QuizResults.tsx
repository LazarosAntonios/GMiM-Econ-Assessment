
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Trophy } from "lucide-react";

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  onBack: () => void; // Changed from onRestart to onBack
  quizTitle: string;
}

const QuizResults: React.FC<QuizResultsProps> = ({
  score,
  totalQuestions,
  onBack,
  quizTitle
}) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  let message = "Excellent work!";
  if (percentage < 60) {
    message = "Keep studying and try again!";
  } else if (percentage < 80) {
    message = "Good job! Room for improvement.";
  }

  return (
    <Card className="max-w-md w-full mx-auto shadow-lg animate-bounce-in border-t-4 border-econ-gold">
      <CardHeader className="bg-econ-navy text-white rounded-t-lg text-center pb-8 pt-10">
        <Trophy className="w-16 h-16 mx-auto mb-4 text-econ-gold" />
        <CardTitle className="text-2xl">Quiz Results</CardTitle>
        <CardDescription className="text-gray-300">
          {quizTitle}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-8">
        <div className="text-center">
          <div className="mb-4">
            <span className="text-5xl font-bold text-econ-navy">{score}</span>
            <span className="text-xl text-gray-500">/{totalQuestions}</span>
          </div>
          <div className="mb-6">
            <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
              <div 
                className={`h-4 rounded-full ${percentage >= 80 ? 'bg-green-500' : percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600">{percentage}% Correct</p>
          </div>
          <p className="text-lg font-medium mb-4">{message}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={onBack} 
          variant="default" 
          className="w-full bg-econ-accent hover:bg-econ-navy"
        >
          <ArrowRight className="w-4 h-4 mr-2" /> Back to Quizzes
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuizResults;
