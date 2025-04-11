
import { Quiz } from "../types/quiz";

export const economicsQuiz: Quiz = {
  id: 1,
  title: "Economics Fundamentals",
  description: "Test your knowledge of basic economic concepts and principles.",
  questions: [
    {
      id: 1,
      text: "What is the term for the total value of all goods and services produced within a country's borders in a specific time period?",
      options: [
        "Gross National Product (GNP)",
        "Gross Domestic Product (GDP)",
        "National Income (NI)",
        "Consumer Price Index (CPI)"
      ],
      correctAnswer: 1,
      explanation: "Gross Domestic Product (GDP) is the total monetary value of all finished goods and services produced within a country's borders in a specific time period."
    },
    {
      id: 2,
      text: "The law of demand states that, all else equal, as the price of a good or service increases:",
      options: [
        "The quantity demanded increases",
        "The quantity demanded decreases",
        "The supply increases",
        "The market reaches equilibrium"
      ],
      correctAnswer: 1,
      explanation: "According to the law of demand, when the price of a good increases, consumers will demand less of it, assuming all other factors remain constant."
    },
    {
      id: 3,
      text: "What economic concept refers to the additional satisfaction or benefit that a consumer gains from consuming one more unit of a good or service?",
      options: [
        "Marginal utility",
        "Opportunity cost",
        "Comparative advantage",
        "Elasticity of demand"
      ],
      correctAnswer: 0,
      explanation: "Marginal utility is the additional satisfaction a consumer gains from consuming one more unit of a good or service."
    },
    {
      id: 4,
      text: "In economics, a market structure characterized by a single seller controlling the entire market is called:",
      options: [
        "Perfect competition",
        "Oligopoly",
        "Monopolistic competition",
        "Monopoly"
      ],
      correctAnswer: 3,
      explanation: "A monopoly exists when a specific person or enterprise is the only supplier of a particular good or service in a market."
    },
    {
      id: 5,
      text: "What is the term for a situation where increasing all inputs in the same proportion leads to a more than proportional increase in output?",
      options: [
        "Diseconomies of scale",
        "Economies of scale",
        "Constant returns to scale",
        "Diminishing returns"
      ],
      correctAnswer: 1,
      explanation: "Economies of scale refer to the cost advantages that enterprises obtain due to their scale of operation, with cost per unit of output decreasing with increasing scale."
    }
  ]
};

export const macroeconomicsQuiz: Quiz = {
  id: 2,
  title: "Macroeconomics Concepts",
  description: "Test your understanding of macroeconomic theories and policies.",
  questions: [
    {
      id: 1,
      text: "Which of the following is NOT a tool of monetary policy?",
      options: [
        "Open market operations",
        "Reserve requirements",
        "Government spending",
        "Discount rate"
      ],
      correctAnswer: 2,
      explanation: "Government spending is a fiscal policy tool, not a monetary policy tool. Monetary policy is implemented by central banks, while fiscal policy is implemented by the government."
    },
    {
      id: 2,
      text: "What term describes a sustained increase in the general price level of goods and services in an economy over a period of time?",
      options: [
        "Deflation",
        "Disinflation",
        "Inflation",
        "Stagflation"
      ],
      correctAnswer: 2,
      explanation: "Inflation is the rate at which the general level of prices for goods and services is rising, and subsequently, purchasing power is falling."
    },
    {
      id: 3,
      text: "Which economic theory suggests that government spending can increase aggregate demand and pull an economy out of recession?",
      options: [
        "Monetarism",
        "Keynesian economics",
        "Supply-side economics",
        "Classical economics"
      ],
      correctAnswer: 1,
      explanation: "Keynesian economics advocates for increased government expenditures and lower taxes to stimulate demand and pull the global economy out of a depression."
    }
  ]
};

export const sampleQuizzes = [economicsQuiz, macroeconomicsQuiz];
