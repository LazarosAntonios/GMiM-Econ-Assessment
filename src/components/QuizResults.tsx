
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Trophy, UserRound, IdCard, Check, X } from "lucide-react";
import { StudentInfo } from '@/types/quiz';

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  onBack: () => void;
  quizTitle: string;
  quizCategory: "managerial" | "foundational";
  studentInfo: StudentInfo;
  isEligibleForAdvanced?: boolean;
  sectionScores?: {[section: string]: {correct: number, total: number, percentage: number}} | null;
  passedSections?: string[];
  failedSections?: string[];
}

const QuizResults: React.FC<QuizResultsProps> = ({
  score,
  totalQuestions,
  onBack,
  quizTitle,
  quizCategory,
  studentInfo,
  isEligibleForAdvanced,
  sectionScores,
  passedSections,
  failedSections
}) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  let message = "Excellent work!";
  if (percentage < 60) {
    message = "Keep studying and try again!";
  } else if (percentage < 80) {
    message = "Good job! Room for improvement.";
  }

  // Determine eligibility recommendation
  const eligibilityMessage = isEligibleForAdvanced 
    ? "Congrats, you're eligible for the advanced course!" 
    : "We recommend the standard Economics course for you.";

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
        <div className="flex items-center justify-center space-x-2 mb-4 text-gray-700">
          <UserRound className="h-5 w-5" />
          <span>{studentInfo.name}</span>
          <IdCard className="h-5 w-5 ml-2" />
          <span>{studentInfo.studentId}</span>
        </div>
        
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
          
          {/* Section Scores */}
          {sectionScores && Object.keys(sectionScores).length > 0 && (
            <div className="mt-6 mb-6">
              <h3 className="font-semibold text-lg mb-2">Section Results</h3>
              <div className="space-y-3">
                {Object.entries(sectionScores).map(([section, data]) => (
                  <div key={section} className="flex items-center justify-between">
                    <div className="flex items-center">
                      {passedSections?.includes(section) ? (
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                      ) : (
                        <X className="h-4 w-4 text-red-500 mr-2" />
                      )}
                      <span>{section}</span>
                    </div>
                    <div>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        data.percentage >= 80 ? 'bg-green-100 text-green-800' : 
                        data.percentage >= 60 ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {data.correct}/{data.total} ({data.percentage}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className={`p-4 rounded-lg ${isEligibleForAdvanced ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-yellow-50 text-yellow-800 border border-yellow-200'}`}>
            <p className="font-medium">{eligibilityMessage}</p>
          </div>
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
