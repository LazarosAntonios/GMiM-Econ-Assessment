
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, ArrowRight, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Quiz } from '@/types/quiz';

interface PreTestSectionProps {
  preTest: Quiz;
  onSelectQuiz: (id: number) => void;
  hasCompletedPreTest: boolean;
  preTestStatus: {
    score: number;
    totalQuestions: number;
    percentage: number;
    isEligible: boolean;
    date: Date;
  } | null;
}

const PreTestSection: React.FC<PreTestSectionProps> = ({ 
  preTest, 
  onSelectQuiz, 
  hasCompletedPreTest, 
  preTestStatus 
}) => {
  return (
    <div className="mb-6">
      <div className="bg-green-50 border-l-4 border-green-500 p-3 mb-4">
        <h3 className="font-bold text-green-700">REQUIRED: Pre-Test Assessment</h3>
        <p className="text-sm text-green-600">All students must complete the pre-test to determine course eligibility</p>
      </div>
      
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
            <p className="text-sm text-gray-600 mt-3">
              You cannot retake the pre-test. {preTestStatus?.isEligible ? 
                "You're eligible for the advanced course." : 
                "Please follow the standard course track."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreTestSection;
