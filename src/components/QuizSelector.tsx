
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BookOpen, Clock, BookOpen as BookIcon } from "lucide-react";
import { Quiz } from '@/types/quiz';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface QuizSelectorProps {
  quizzes: Quiz[];
  onSelectQuiz: (quizId: number) => void;
}

const QuizSelector: React.FC<QuizSelectorProps> = ({ quizzes, onSelectQuiz }) => {
  const managerialQuizzes = quizzes.filter(quiz => quiz.category === "managerial");
  const foundationalQuizzes = quizzes.filter(quiz => quiz.category === "foundational");
  const [showManagerial, setShowManagerial] = useState<boolean>(false);
  
  return (
    <div className="container mx-auto py-10 animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-econ-navy mb-2">
        Economics Assessment Platform
      </h1>
      <p className="text-lg text-gray-600 text-center mb-10">
        Select a test to assess your knowledge
      </p>
      
      <div className="mb-8 flex flex-col items-center">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-5 max-w-md">
          <div className="flex items-start">
            <Badge variant="outline" className="bg-blue-100 text-blue-800 mr-2 mt-1">Optional</Badge>
            <div>
              <h3 className="font-semibold text-econ-navy">Managerial Economics Assessment</h3>
              <p className="text-sm text-gray-600 mb-3">
                For students with prior economics knowledge who may qualify for advanced placement.
              </p>
              {!showManagerial ? (
                <Button 
                  onClick={() => setShowManagerial(true)} 
                  variant="outline"
                  className="text-sm border-econ-navy text-econ-navy hover:bg-econ-navy hover:text-white"
                >
                  <BookIcon className="mr-2 h-4 w-4" />
                  Enroll in Advanced Assessment
                </Button>
              ) : (
                <Button 
                  onClick={() => setShowManagerial(false)} 
                  variant="outline"
                  className="text-sm border-gray-400 text-gray-500"
                >
                  Hide Advanced Assessment
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="foundational" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="foundational">Mandatory Foundational Tests</TabsTrigger>
          {showManagerial && <TabsTrigger value="managerial">Optional Managerial Tests</TabsTrigger>}
        </TabsList>
        
        <TabsContent value="foundational">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {foundationalQuizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} onSelectQuiz={onSelectQuiz} />
            ))}
          </div>
        </TabsContent>
        
        {showManagerial && (
          <TabsContent value="managerial">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {managerialQuizzes.map((quiz) => (
                <QuizCard key={quiz.id} quiz={quiz} onSelectQuiz={onSelectQuiz} />
              ))}
            </div>
          </TabsContent>
        )}
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
