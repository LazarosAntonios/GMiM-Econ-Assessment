
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BookOpen, Clock, BookOpen as BookIcon, Lock, Unlock, AlertTriangle, CheckCircle } from "lucide-react";
import { Quiz, QuizResult } from '@/types/quiz';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

interface QuizSelectorProps {
  quizzes: Quiz[];
  preTest: Quiz;
  onSelectQuiz: (quizId: number) => void;
  hasCompletedPreTest: boolean;
  isEligibleForAdvanced: boolean;
  studentResults: QuizResult[];
}

const QuizSelector: React.FC<QuizSelectorProps> = ({ 
  quizzes, 
  preTest,
  onSelectQuiz, 
  hasCompletedPreTest,
  isEligibleForAdvanced,
  studentResults
}) => {
  const managerialQuizzes = quizzes.filter(quiz => quiz.category === "managerial");
  const foundationalQuizzes = quizzes.filter(quiz => quiz.category === "foundational");
  const preTestQuizzes = foundationalQuizzes.filter(quiz => quiz.title.toLowerCase().includes("pre-test"));
  const postTestQuizzes = foundationalQuizzes.filter(quiz => quiz.title.toLowerCase().includes("post-test"));
  
  const [showManagerial, setShowManagerial] = useState<boolean>(isEligibleForAdvanced);
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
      {preTestStatus && (
        <div className="mb-8 max-w-lg mx-auto">
          <Card className="border-l-4 border-econ-navy">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Pre-Test Results</CardTitle>
                <Badge variant="outline" className={preTestStatus.isEligible ? 
                  "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                  {preTestStatus.isEligible ? "Advanced Eligible" : "Standard Track"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-600">
                    Score: <span className="font-bold">{preTestStatus.score}/{preTestStatus.totalQuestions}</span> ({preTestStatus.percentage}%)
                  </p>
                  <p className="text-xs text-gray-500">
                    Completed on {preTestStatus.date.toLocaleDateString()}
                  </p>
                </div>
                <div className={`p-2 rounded-lg ${preTestStatus.isEligible ? 
                  'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
                  {preTestStatus.isEligible ? (
                    <p className="text-sm font-medium flex items-center"><CheckCircle className="h-4 w-4 mr-1" /> Eligible for advanced course</p>
                  ) : (
                    <p className="text-sm font-medium flex items-center"><AlertTriangle className="h-4 w-4 mr-1" /> Standard course recommended</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      {/* Display Advanced Course Option if eligible */}
      {(isEligibleForAdvanced || !hasCompletedPreTest) && (
        <div className="mb-8 flex flex-col items-center">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-5 max-w-md">
            <div className="flex items-start">
              <Badge variant="outline" className="bg-blue-100 text-blue-800 mr-2 mt-1">
                {isEligibleForAdvanced ? "Available" : "Optional"}
              </Badge>
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
      )}
      
      <Tabs defaultValue="foundational" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="foundational">Mandatory Foundational Tests</TabsTrigger>
          {showManagerial && <TabsTrigger value="managerial">Optional Managerial Tests</TabsTrigger>}
        </TabsList>
        
        <TabsContent value="foundational">
          {/* Pre-Test section - always visible */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4 text-econ-navy">Pre-Test Assessment</h2>
            {/* Show the comprehensive pre-test */}
            <div className="mb-8">
              {!hasCompletedPreTest ? (
                <Card className="shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader className="bg-econ-navy text-white rounded-t-lg">
                    <div className="flex justify-between items-center">
                      <CardTitle>{preTest.title}</CardTitle>
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                        Foundational
                      </span>
                    </div>
                    <CardDescription className="text-gray-300 flex items-center mt-2">
                      <Clock className="h-4 w-4 mr-1" /> {preTest.duration} minutes | {preTest.questions.length} questions
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-gray-700">{preTest.description}</p>
                    <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mt-4">
                      <div className="flex items-start">
                        <AlertTriangle className="h-4 w-4 text-yellow-600 mr-2 mt-1" />
                        <p className="text-sm text-yellow-700">
                          You'll have <strong>ONE</strong> attempt to complete this test. Results will determine your course eligibility.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={() => onSelectQuiz(preTest.id)} 
                      variant="default" 
                      className="w-full bg-econ-accent hover:bg-econ-navy"
                    >
                      Take Pre-Test <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                  <CheckCircle className="h-12 w-12 mx-auto mb-2 text-green-500" />
                  <h3 className="text-lg font-medium text-gray-700">You've completed the pre-test</h3>
                  <p className="text-gray-500 mt-2">
                    Your score: {preTestStatus?.score}/{preTestStatus?.totalQuestions} ({preTestStatus?.percentage}%)
                  </p>
                </div>
              )}
            </div>
            
            {/* Normal pre-tests from the sample data, if any */}
            {preTestQuizzes.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {preTestQuizzes.map((quiz) => (
                  <QuizCard key={quiz.id} quiz={quiz} onSelectQuiz={onSelectQuiz} />
                ))}
              </div>
            )}
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
              postTestQuizzes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {postTestQuizzes.map((quiz) => (
                    <QuizCard key={quiz.id} quiz={quiz} onSelectQuiz={onSelectQuiz} />
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                  <p className="text-gray-600">No post-test assessments are currently available.</p>
                </div>
              )
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
