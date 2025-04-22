import React, { useState, useEffect } from "react";
import { Quiz, StudentInfo, QuizResult } from "../types/quiz";
import QuizHeader from "./QuizHeader";
import QuestionCard from "./QuestionCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import QuizResults from "./QuizResults";
import QuizWelcome from "./QuizWelcome";
import { useToast } from "@/hooks/use-toast";

interface QuizContainerProps {
  quiz: Quiz;
  onBack: () => void;
  studentInfo: StudentInfo;
  onComplete?: (result: QuizResult) => void;
}

const QuizContainer: React.FC<QuizContainerProps> = ({ quiz, onBack, studentInfo, onComplete }) => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<(number | null)[]>(
    Array(quiz.questions.length).fill(null)
  );
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(
    Array(quiz.questions.length).fill(false)
  );
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { toast } = useToast();
  
  const [currentSection, setCurrentSection] = useState<string | null>(null);
  
  useEffect(() => {
    const question = quiz.questions[currentQuestionIndex];
    if (question && question.section !== currentSection) {
      setCurrentSection(question.section || null);
    }
  }, [currentQuestionIndex, quiz.questions, currentSection]);

  useEffect(() => {
    setSelectedOptions(Array(quiz.questions.length).fill(null));
    setAnsweredQuestions(Array(quiz.questions.length).fill(false));
    setCurrentQuestionIndex(0);
    setQuizCompleted(false);
    setQuizStarted(false);
  }, [quiz.id]);

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
      
      const result = saveQuizResult();
      if (onComplete) {
        onComplete(result);
      }
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
    toast({
      title: `Starting ${quiz.title}`,
      description: "Good luck! Read each question carefully.",
    });
  };

  const calculateScore = () => {
    return selectedOptions.reduce((score, selected, index) => {
      if (selected === quiz.questions[index].correctAnswer) {
        return score + 1;
      }
      return score;
    }, 0);
  };
  
  const calculateSectionScores = () => {
    if (!quiz.questions.some(q => q.section)) {
      return null;
    }
    
    const sectionMap: {[section: string]: {correct: number, total: number, percentage: number}} = {};
    
    quiz.questions.forEach((question, index) => {
      const section = question.section || "General";
      if (!sectionMap[section]) {
        sectionMap[section] = {correct: 0, total: 0, percentage: 0};
      }
      
      sectionMap[section].total += 1;
      if (selectedOptions[index] === question.correctAnswer) {
        sectionMap[section].correct += 1;
      }
    });
    
    Object.keys(sectionMap).forEach(section => {
      sectionMap[section].percentage = Math.round((sectionMap[section].correct / sectionMap[section].total) * 100);
    });
    
    return sectionMap;
  };
  
  const determineEligibility = (score: number, totalQuestions: number, sectionScores: any) => {
    const overallPercentage = Math.round((score / totalQuestions) * 100);
    
    if (quiz.category === "managerial") {
      return overallPercentage >= 70;
    }
    
    if (quiz.sectionsConfig && sectionScores) {
      const { sections, requireAllSections } = quiz.sectionsConfig;
      
      const passedSections = sections.filter(sectionConfig => {
        const sectionScore = sectionScores[sectionConfig.name];
        return sectionScore && sectionScore.percentage >= sectionConfig.passingScore;
      });
      
      if (requireAllSections) {
        return passedSections.length === sections.length && overallPercentage >= (quiz.passingScore || 70);
      }
      
      return overallPercentage >= (quiz.passingScore || 70);
    }
    
    return overallPercentage >= 70;
  };
  
  const getSectionResults = (sectionScores: any) => {
    if (!quiz.sectionsConfig || !sectionScores) {
      return { passed: [], failed: [] };
    }
    
    const passedSections: string[] = [];
    const failedSections: string[] = [];
    
    quiz.sectionsConfig.sections.forEach(sectionConfig => {
      const sectionScore = sectionScores[sectionConfig.name];
      if (sectionScore && sectionScore.percentage >= sectionConfig.passingScore) {
        passedSections.push(sectionConfig.name);
      } else {
        failedSections.push(sectionConfig.name);
      }
    });
    
    return { passedSections, failedSections };
  };
  
  const saveQuizResult = () => {
    const score = calculateScore();
    const sectionScores = calculateSectionScores();
    const { passedSections, failedSections } = getSectionResults(sectionScores);
    const isEligible = determineEligibility(score, quiz.questions.length, sectionScores);
    
    const result: QuizResult = {
      studentInfo,
      quizId: quiz.id,
      quizTitle: quiz.title,
      quizCategory: quiz.category,
      score,
      totalQuestions: quiz.questions.length,
      passedSections,
      failedSections,
      sectionScores,
      isEligibleForAdvanced: isEligible,
      date: new Date()
    };
    
    try {
      const existingResultsString = localStorage.getItem('studentResults') || '[]';
      const existingResults: QuizResult[] = JSON.parse(existingResultsString);
      
      const filteredResults = existingResults.filter(
        r => !(r.quizId === quiz.id && r.studentInfo.studentId === studentInfo.studentId)
      );
      
      filteredResults.push(result);
      
      localStorage.setItem('studentResults', JSON.stringify(filteredResults));
      
      toast({
        title: "Results saved",
        description: "Your quiz results have been stored successfully.",
      });
    } catch (error) {
      console.error("Failed to save quiz results:", error);
      toast({
        title: "Error saving results",
        description: "There was a problem storing your quiz results.",
        variant: "destructive",
      });
    }
    
    return result;
  };

  if (!quizStarted) {
    return <QuizWelcome quiz={quiz} onStart={handleStartQuiz} />;
  }

  if (quizCompleted) {
    const score = calculateScore();
    const sectionScores = calculateSectionScores();
    const { passedSections, failedSections } = getSectionResults(sectionScores);
    const isEligible = determineEligibility(score, quiz.questions.length, sectionScores);
    
    return (
      <QuizResults
        score={score}
        totalQuestions={quiz.questions.length}
        quizTitle={quiz.title}
        quizCategory={quiz.category}
        studentInfo={studentInfo}
        sectionScores={sectionScores}
        passedSections={passedSections}
        failedSections={failedSections}
        isEligibleForAdvanced={isEligible}
        completionDate={new Date()}
      />
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const showSectionHeader = currentQuestion.section && (currentQuestionIndex === 0 || 
    currentQuestion.section !== quiz.questions[Math.max(0, currentQuestionIndex - 1)].section);

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
        currentSection={currentQuestion.section}
        isPostTest={quiz.isPostTest}
      />
      
      {showSectionHeader && currentQuestion.section && (
        <div className="mb-4 bg-blue-50 rounded-md p-3 border border-blue-100">
          <h3 className="font-semibold text-econ-navy">
            Section: {currentQuestion.section}
          </h3>
        </div>
      )}
      
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
