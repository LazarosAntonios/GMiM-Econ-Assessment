
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface QuizHeaderProps {
  title: string;
  description: string;
  currentQuestion: number;
  totalQuestions: number;
}

const QuizHeader: React.FC<QuizHeaderProps> = ({
  title,
  description,
  currentQuestion,
  totalQuestions,
}) => {
  return (
    <Card className="border-econ-gold border-b-4 mb-6 shadow-md animate-fade-in">
      <CardHeader className="bg-econ-navy text-white rounded-t-lg">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl md:text-2xl">{title}</CardTitle>
          <span className="bg-econ-gold text-econ-navy px-3 py-1 rounded-full font-bold">
            {currentQuestion} / {totalQuestions}
          </span>
        </div>
        <CardDescription className="text-gray-300">
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default QuizHeader;
