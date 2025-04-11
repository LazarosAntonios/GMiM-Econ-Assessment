
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

interface QuizHeaderProps {
  title: string;
  description: string;
  currentQuestion: number;
  totalQuestions: number;
  currentSection?: string | null;
  isPostTest?: boolean;
}

const QuizHeader: React.FC<QuizHeaderProps> = ({
  title,
  description,
  currentQuestion,
  totalQuestions,
  currentSection,
  isPostTest
}) => {
  return (
    <Card className={`border-b-4 mb-6 shadow-md animate-fade-in ${isPostTest ? "border-purple-500" : "border-econ-gold"}`}>
      <CardHeader className={`${isPostTest ? "bg-purple-900" : "bg-econ-navy"} text-white rounded-t-lg pb-4`}>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl md:text-2xl">{title}</CardTitle>
            {currentSection && (
              <div className="mt-2 text-sm inline-flex items-center bg-blue-800/50 px-3 py-1 rounded-full">
                <span className="w-2 h-2 bg-blue-300 rounded-full mr-2"></span>
                Section: {currentSection}
              </div>
            )}
            {isPostTest && (
              <div className="mt-2 text-xs inline-flex items-center bg-purple-800/50 px-3 py-1 rounded-full">
                <AlertCircle className="w-3 h-3 mr-1" />
                Advanced Assessment | Higher Passing Threshold (75%)
              </div>
            )}
          </div>
          <div className="flex flex-col items-end">
            <span className={`${isPostTest ? "bg-purple-400 text-purple-900" : "bg-econ-gold text-econ-navy"} px-3 py-1 rounded-full font-bold`}>
              {currentQuestion} / {totalQuestions}
            </span>
            {currentSection && <span className="text-xs text-gray-300 mt-1">Progress in current section</span>}
          </div>
        </div>
        <CardDescription className="text-gray-300 mt-3">
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default QuizHeader;
