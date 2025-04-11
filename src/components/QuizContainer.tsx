
import React, { useState } from "react";
import { Quiz } from "../types/quiz";
import QuizHeader from "./QuizHeader";
import QuestionCard from "./QuestionCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import QuizResults from "./QuizResults";
import QuizWelcome from "./QuizWelcome";

interface QuizContainerProps {
  quiz: Quiz;
  onBack: () => void;
}

const QuizContainer: React.FC<QuizContainerProps> = ({ quiz, onBack }) => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<(number | null)[]>(
    Array(quiz.questions.length).fill(null)
  );
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(
    Array(quiz.questions.length).fill(false)
  );
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleOptionSelect = (optionIndex: number) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentQuestionIndex] = optionIndex;
    setSelectedOptions(newSelectedOptions);

    const newAnsweredQuestions = [...answeredQuestions];
    newAnsweredQuestions[currentQuestionIndex] = true;
    setAnsweredQuestions(newAnsweredQuestions);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const calculateScore = () => {
    return selectedOptions.reduce((score, selected, index) => {
      if (selected === quiz.questions[index].correctAnswer) {
        return score + 1;
      }
      return score;
    }, 0);
  };

  if (!quizStarted) {
    return <QuizWelcome quiz={quiz} onStart={handleStartQuiz} />;
  }

  if (quizCompleted) {
    return (
      <QuizResults
        score={calculateScore()}
        totalQuestions={quiz.questions.length}
        onBack={onBack}
        quizTitle={quiz.title}
      />
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onBack}
          className="text-econ-navy"
        >
          Back to Quizzes
        </Button>
      </div>
      
      <QuizHeader
        title={quiz.title}
        description={quiz.description}
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={quiz.questions.length}
      />
      
      <QuestionCard
        question={currentQuestion}
        selectedOption={selectedOptions[currentQuestionIndex]}
        isAnswered={answeredQuestions[currentQuestionIndex]}
        onOptionSelect={handleOptionSelect}
      />
      
      <div className="mt-6 flex justify-between">
        <Button
          variant="outline"
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
          className="flex items-center"
        >
          <ChevronLeft className="w-4 h-4 mr-1" /> Previous
        </Button>
        
        <Button
          variant="default"
          onClick={handleNextQuestion}
          disabled={!answeredQuestions[currentQuestionIndex]}
          className="bg-econ-accent hover:bg-econ-navy flex items-center"
        >
          {currentQuestionIndex === quiz.questions.length - 1 ? "Finish" : "Next"} <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default QuizContainer;
