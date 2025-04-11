
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { Quiz } from '@/types/quiz';

interface QuizWelcomeProps {
  quiz: Quiz;
  onStart: () => void;
}

const QuizWelcome: React.FC<QuizWelcomeProps> = ({ quiz, onStart }) => {
  return (
    <Card className="max-w-md w-full mx-auto shadow-lg animate-bounce-in">
      <CardHeader className="bg-econ-navy text-white rounded-t-lg">
        <div className="flex justify-center mb-2">
          <BookOpen className="h-12 w-12 text-econ-gold" />
        </div>
        <CardTitle className="text-2xl text-center">{quiz.title}</CardTitle>
        <CardDescription className="text-gray-300 text-center">
          {quiz.category === "managerial" ? "Managerial Economics Test" : "Foundational Skills Test"}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <p className="text-gray-700 mb-4">{quiz.description}</p>
        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
          <h3 className="font-medium text-gray-800 mb-2">Quiz Information:</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center">
              <span className="w-4 h-4 bg-econ-accent rounded-full mr-2"></span>
              <span>{quiz.questions.length} questions</span>
            </li>
            <li className="flex items-center">
              <span className="w-4 h-4 bg-econ-accent rounded-full mr-2"></span>
              <span>Multiple choice format</span>
            </li>
            <li className="flex items-center">
              <Clock className="h-4 w-4 text-econ-accent mr-2" />
              <span>Duration: {quiz.duration} minutes</span>
            </li>
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={onStart} 
          variant="default" 
          className="w-full bg-econ-accent hover:bg-econ-navy flex items-center justify-center"
        >
          Start Quiz <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuizWelcome;
