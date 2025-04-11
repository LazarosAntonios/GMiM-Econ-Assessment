
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Clock } from "lucide-react";
import { Quiz } from '@/types/quiz';

interface QuizCardProps {
  quiz: Quiz;
  onSelectQuiz: (id: number) => void;
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz, onSelectQuiz }) => {
  const categoryBadgeClass = quiz.category === "managerial" 
    ? "bg-blue-100 text-blue-800" 
    : "bg-green-100 text-green-800";
  
  return (
    <Card key={quiz.id} className="shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="bg-econ-navy text-white rounded-t-lg">
        <div className="flex justify-between items-center">
          <CardTitle>{quiz.title}</CardTitle>
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${categoryBadgeClass}`}>
            {quiz.category === "managerial" ? "Managerial" : "Foundational"}
          </span>
        </div>
        <CardDescription className="text-gray-300 flex items-center mt-2">
          <Clock className="h-4 w-4 mr-1" /> {quiz.duration} minutes | {quiz.questions.length} questions
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="text-gray-700">{quiz.description}</p>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={() => onSelectQuiz(quiz.id)} 
          variant="default" 
          className="w-full bg-econ-accent hover:bg-econ-navy"
        >
          Start Test <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuizCard;
