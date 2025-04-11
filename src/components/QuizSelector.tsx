
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BookOpen } from "lucide-react";
import { Quiz } from '@/types/quiz';

interface QuizSelectorProps {
  quizzes: Quiz[];
  onSelectQuiz: (quizId: number) => void;
}

const QuizSelector: React.FC<QuizSelectorProps> = ({ quizzes, onSelectQuiz }) => {
  return (
    <div className="container mx-auto py-10 animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-econ-navy mb-2">
        Economics Quiz Mastery
      </h1>
      <p className="text-lg text-gray-600 text-center mb-10">
        Select a quiz to test your knowledge
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {quizzes.map((quiz) => (
          <Card key={quiz.id} className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="bg-econ-navy text-white rounded-t-lg">
              <CardTitle>{quiz.title}</CardTitle>
              <CardDescription className="text-gray-300">
                {quiz.questions.length} questions
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
                Start Quiz <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuizSelector;
