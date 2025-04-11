
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { Quiz } from '@/types/quiz';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface QuizSelectorProps {
  quizzes: Quiz[];
  onSelectQuiz: (quizId: number) => void;
}

const QuizSelector: React.FC<QuizSelectorProps> = ({ quizzes, onSelectQuiz }) => {
  const managerialQuizzes = quizzes.filter(quiz => quiz.category === "managerial");
  const foundationalQuizzes = quizzes.filter(quiz => quiz.category === "foundational");
  
  return (
    <div className="container mx-auto py-10 animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-econ-navy mb-2">
        Economics Assessment Platform
      </h1>
      <p className="text-lg text-gray-600 text-center mb-10">
        Select a test to assess your knowledge
      </p>
      
      <Tabs defaultValue="all" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="all">All Tests</TabsTrigger>
          <TabsTrigger value="managerial">Managerial Economics</TabsTrigger>
          <TabsTrigger value="foundational">Foundational Skills</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} onSelectQuiz={onSelectQuiz} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="managerial">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {managerialQuizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} onSelectQuiz={onSelectQuiz} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="foundational">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {foundationalQuizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} onSelectQuiz={onSelectQuiz} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const QuizCard = ({ quiz, onSelectQuiz }: { quiz: Quiz, onSelectQuiz: (id: number) => void }) => {
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

export default QuizSelector;
