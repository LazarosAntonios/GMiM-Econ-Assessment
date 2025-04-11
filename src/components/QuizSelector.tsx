import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BookOpen, Clock, BookOpen as BookIcon, Lock, Unlock } from "lucide-react";
import { Quiz } from '@/types/quiz';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

interface QuizSelectorProps {
  quizzes: Quiz[];
  onSelectQuiz: (quizId: number) => void;
}

const QuizSelector: React.FC<QuizSelectorProps> = ({ quizzes, onSelectQuiz }) => {
  const managerialQuizzes = quizzes.filter(quiz => quiz.category === "managerial");
  const foundationalQuizzes = quizzes.filter(quiz => quiz.category === "foundational");
  const preTestQuizzes = foundationalQuizzes.filter(quiz => quiz.title.toLowerCase().includes("pre-test"));
  const postTestQuizzes = foundationalQuizzes.filter(quiz => quiz.title.toLowerCase().includes("post-test"));
  
  const [showManagerial, setShowManagerial] = useState<boolean>(false);
  const [postPasskey, setPostPasskey] = useState<string>("");
  const [postTestUnlocked, setPostTestUnlocked] = useState<boolean>(false);
  
  const handleUnlockPostTest = () => {
    if (postPasskey === "PASS") {
      setPostTestUnlocked(true);
      toast({
        title: "Post-Test Unlocked",
        description: "You now have access to the post-test assessment.",
      });
    } else {
      toast({
        title: "Invalid Passkey",
        description: "The passkey you entered is incorrect.",
        variant: "destructive",
      });
    }
  };
  
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
          {/* Pre-Test section - always visible */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4 text-econ-navy">Pre-Test Assessments</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {preTestQuizzes.map((quiz) => (
                <QuizCard key={quiz.id} quiz={quiz} onSelectQuiz={onSelectQuiz} />
              ))}
            </div>
          </div>
          
          {/* Post-Test section with lock/unlock */}
          <div className="mt-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-econ-navy">Post-Test Assessments</h2>
              {!postTestUnlocked && (
                <div className="flex space-x-2">
                  <Input
                    type="password"
                    placeholder="Enter passkey to unlock"
                    value={postPasskey}
                    onChange={(e) => setPostPasskey(e.target.value)}
                    className="w-48"
                  />
                  <Button onClick={handleUnlockPostTest} size="sm">
                    <Lock className="w-4 h-4 mr-2" /> Unlock
                  </Button>
                </div>
              )}
              {postTestUnlocked && (
                <Badge className="bg-green-100 text-green-800 flex items-center">
                  <Unlock className="w-4 h-4 mr-1" /> Unlocked
                </Badge>
              )}
            </div>
            
            {postTestUnlocked ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {postTestQuizzes.map((quiz) => (
                  <QuizCard key={quiz.id} quiz={quiz} onSelectQuiz={onSelectQuiz} />
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                <Lock className="w-8 h-8 mx-auto mb-3 text-gray-400" />
                <h3 className="text-lg font-medium text-gray-700">Post-Test is Locked</h3>
                <p className="text-gray-500 mt-2">Enter the correct passkey to unlock the post-test assessments.</p>
              </div>
            )}
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
