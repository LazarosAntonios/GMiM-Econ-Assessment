
import { Quiz } from '@/types/quiz';

export const sampleQuizzes: Quiz[] = [
  {
    id: 1,
    title: "Managerial Economics - Part A",
    description: "Tests fundamental concepts including supply and demand analysis, elasticity, and costs and revenues.",
    category: "managerial",
    duration: 45,
    questions: [
      {
        id: 1,
        text: "If the price of laptops decreases by 10% and quantity demanded increases by 20%, the price elasticity of demand is:",
        options: ["-0.5", "-1.0", "-2.0", "2.0"],
        correctAnswer: 2,
        explanation: "The price elasticity is calculated as percentage change in quantity divided by percentage change in price. Here it's -20%/-10% = -2.0."
      },
      {
        id: 2,
        text: "In a perfectly competitive market, a firm maximizes profit by producing where:",
        options: ["Average Revenue = Average Cost", "Average Revenue = Marginal Cost", "Marginal Revenue = Marginal Cost", "Total Revenue = Total Cost"],
        correctAnswer: 2,
        explanation: "In any market structure, profit maximization occurs where marginal revenue equals marginal cost."
      },
      {
        id: 3,
        text: "When a good has an income elasticity of demand greater than 1, it is considered:",
        options: ["A luxury good", "A necessity", "An inferior good", "A substitute good"],
        correctAnswer: 0,
        explanation: "Income elasticity > 1 indicates that demand increases proportionally more than income, which is characteristic of luxury goods."
      }
    ]
  },
  {
    id: 2,
    title: "Managerial Economics - Part B",
    description: "Advanced topics including game theory, externalities, and advanced pricing strategies.",
    category: "managerial",
    duration: 35,
    questions: [
      {
        id: 1,
        text: "In a payoff matrix where both firms can choose 'High Price' or 'Low Price', the Nash Equilibrium is typically where:",
        options: ["Both choose High Price", "Both choose Low Price", "One chooses High and one chooses Low", "There is no Nash Equilibrium"],
        correctAnswer: 1,
        explanation: "In a classic prisoner's dilemma pricing scenario, both firms have an incentive to undercut, leading to both choosing Low Price as the Nash Equilibrium."
      },
      {
        id: 2,
        text: "Third-degree price discrimination involves:",
        options: ["Charging different prices based on quantity purchased", "Charging different prices to different customer groups", "Charging different prices at different times", "Charging a fixed fee plus a per-unit charge"],
        correctAnswer: 1,
        explanation: "Third-degree price discrimination is when a firm charges different prices to different customer groups (e.g., students vs. adults)."
      }
    ]
  },
  {
    id: 3,
    title: "Foundational Skills - Mathematics",
    description: "Tests fundamental mathematical concepts needed for economics including calculus, algebra, and optimization.",
    category: "foundational",
    duration: 40,
    questions: [
      {
        id: 1,
        text: "To find the maximum of the function f(x) = 10x - x², you would:",
        options: ["Set f(x) = 0 and solve for x", "Set f'(x) = 0 and solve for x", "Set f''(x) = 0 and solve for x", "Find where f(x) is undefined"],
        correctAnswer: 1,
        explanation: "To find maxima/minima, we set the first derivative equal to zero. Here f'(x) = 10 - 2x = 0, so x = 5."
      },
      {
        id: 2,
        text: "If y = 3x² + 2x - 5, then dy/dx equals:",
        options: ["3x² + 2", "6x + 2", "6x² + 2x", "6x"],
        correctAnswer: 1,
        explanation: "The derivative of y = 3x² + 2x - 5 is dy/dx = 6x + 2."
      }
    ]
  },
  {
    id: 4,
    title: "Foundational Skills - Statistics",
    description: "Tests statistical concepts including probability, distributions, hypothesis testing, and regression analysis.",
    category: "foundational",
    duration: 35,
    questions: [
      {
        id: 1,
        text: "A statistical test with a p-value of 0.03 means:",
        options: ["The null hypothesis is true", "The probability of the result occurring by chance is 3%", "The alternative hypothesis has a 3% chance of being wrong", "The test is 97% accurate"],
        correctAnswer: 1,
        explanation: "A p-value of 0.03 means there's a 3% probability of obtaining the observed results (or more extreme) if the null hypothesis were true."
      },
      {
        id: 2,
        text: "In a simple linear regression model, the R² value represents:",
        options: ["The slope of the regression line", "The correlation coefficient", "The proportion of variance in the dependent variable explained by the model", "The statistical significance of the model"],
        correctAnswer: 2,
        explanation: "R² (R-squared) measures the proportion of variance in the dependent variable that is explained by the independent variable(s) in the model."
      }
    ]
  }
];
