
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, UserRound, IdCard, Check, X, Camera } from "lucide-react";
import { StudentInfo } from '@/types/quiz';
import { Separator } from "@/components/ui/separator";

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
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
  quizTitle,
  quizCategory,
  studentInfo,
  isEligibleForAdvanced,
  sectionScores,
  passedSections,
  failedSections
}) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  const isPreTest = quizTitle.includes("Pre-Test");
  const isPostTest = quizTitle.includes("Post-Test");

  // Determine next steps message based on test type and result
  let eligibilityMessage = "";
  let nextStepsMessage = "";

  if (isPreTest) {
    if (isEligibleForAdvanced) {
      eligibilityMessage = "You've completed the pre-test!";
      nextStepsMessage = "You can now proceed to the post-test using the passkey below.";
    } else {
      eligibilityMessage = "You need to complete the pre-sessional materials.";
      nextStepsMessage = "Please complete the designated Moodle pre-sessional materials before taking the post-test. When you return to take the post-test, you can safely skip the pre-test and move straight to the post-test using the passkey provided in Moodle.";
    }
  } else if (isPostTest) {
    if (isEligibleForAdvanced) {
      eligibilityMessage = "You've passed the post-test!";
      nextStepsMessage = "You've successfully completed the required foundational assessment. It's recommended (but not required) to also take the optional advanced assessments.";
    } else {
      eligibilityMessage = "Assessment completed.";
      nextStepsMessage = "You've completed the post-test. Please review the pre-sessional materials on Moodle for additional support.";
    }
  } else {
    nextStepsMessage = "Thank you for completing this assessment. Your results have been recorded.";
  }

  // Post-test passkey for pre-test passers
  const postTestPasskey = "PASS";
  const showPostTestPasskey = isPreTest && isEligibleForAdvanced;

  return (
    <Card className={`max-w-md w-full mx-auto shadow-lg animate-bounce-in border-t-4 ${isPostTest ? "border-purple-500" : "border-econ-gold"}`}>
      <CardHeader className={`${isPostTest ? "bg-purple-900" : "bg-econ-navy"} text-white rounded-t-lg text-center pb-8 pt-10`}>
        <Trophy className="w-16 h-16 mx-auto mb-4 text-econ-gold" />
        <CardTitle className="text-2xl">Assessment Results</CardTitle>
        <CardDescription className="text-gray-300">
          {quizTitle}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-8">
        {/* Student Information */}
        <div className="flex items-center justify-center space-x-2 mb-6 p-3 bg-blue-50 rounded-lg border border-blue-100">
          <div className="flex flex-col items-center">
            <div className="flex items-center mb-1">
              <UserRound className="h-5 w-5 text-blue-700 mr-2" />
              <span className="font-semibold text-blue-900">{studentInfo.name}</span>
            </div>
            <div className="flex items-center">
              <IdCard className="h-5 w-5 text-blue-700 mr-2" />
              <span className="font-semibold text-blue-900">ID: {studentInfo.studentId}</span>
            </div>
          </div>
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
            <p className="text-sm text-gray-600">{percentage}% Complete</p>
          </div>
          
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
          
          <div className={`p-4 rounded-lg mb-4 ${isEligibleForAdvanced ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-yellow-50 text-yellow-800 border border-yellow-200'}`}>
            <p className="font-medium">{eligibilityMessage}</p>
          </div>
          
          {/* Post-Test Passkey for eligible students */}
          {showPostTestPasskey && (
            <div className="mt-6 bg-blue-100 border-2 border-blue-300 rounded-lg p-4">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <h3 className="font-bold text-blue-800">Post-Test Access</h3>
              </div>
              <p className="text-blue-800 mb-2">
                You've qualified to take the Post-Test directly! Use this passkey:
              </p>
              <div className="bg-white p-3 rounded border border-blue-300">
                <p className="font-mono font-bold text-xl tracking-wider text-center">{postTestPasskey}</p>
              </div>
            </div>
          )}
          
          <div className="mt-6">
            <Separator className="my-4" />
            <p className="text-gray-700">{nextStepsMessage}</p>
            
            <div className="bg-blue-50 p-4 rounded-lg mt-4 border border-blue-100 flex items-start">
              <Camera className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
              <div>
                <p className="text-blue-800 font-medium">Important:</p>
                <p className="text-sm text-blue-700">Please screenshot this page for your records and email it to your instructor.</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizResults;

