
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Question } from "../types/quiz";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  question: Question;
  selectedOption: number | null;
  isAnswered: boolean;
  onOptionSelect: (optionIndex: number) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedOption,
  isAnswered,
  onOptionSelect,
}) => {
  return (
    <Card className="animate-bounce-in shadow-lg">
      <CardContent className="p-6">
        <h3 className="text-lg md:text-xl font-semibold mb-4">
          {question.text}
        </h3>
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !isAnswered && onOptionSelect(index)}
              disabled={isAnswered}
              className={cn(
                "w-full text-left px-4 py-3 rounded-md border transition-all duration-200 hover:border-econ-accent",
                isAnswered && index === question.correctAnswer
                  ? "bg-green-100 border-green-500"
                  : isAnswered && index === selectedOption
                  ? "bg-red-100 border-red-500"
                  : selectedOption === index
                  ? "bg-econ-accent bg-opacity-10 border-econ-accent"
                  : "bg-white border-gray-200 hover:bg-gray-50"
              )}
            >
              <div className="flex items-center">
                <span className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center mr-3 text-sm",
                  isAnswered && index === question.correctAnswer
                    ? "bg-green-500 text-white"
                    : isAnswered && index === selectedOption
                    ? "bg-red-500 text-white"
                    : selectedOption === index
                    ? "bg-econ-accent text-white"
                    : "bg-gray-200 text-gray-700"
                )}>
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
              </div>
            </button>
          ))}
        </div>
        {isAnswered && question.explanation && (
          <div className="mt-4 bg-blue-50 p-4 rounded-md border border-blue-100">
            <h4 className="font-medium text-blue-800 mb-1">Explanation:</h4>
            <p className="text-blue-700">{question.explanation}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
