
import { Quiz } from '@/types/quiz';

export const foundationalPreTest: Quiz = {
  id: 101,
  title: "Foundational Skills Pre-Test",
  description: "Comprehensive assessment of math, statistics, and basic economics knowledge",
  category: "foundational",
  duration: 60,
  isPreTest: true,
  passingScore: 70, // 70% overall passing score
  sectionsConfig: {
    sections: [
      { name: "Math", passingScore: 60 },
      { name: "Statistics", passingScore: 60 },
      { name: "Basic Economics", passingScore: 60 }
    ],
    requireAllSections: true // Must pass all sections to pass overall
  },
  questions: [
    // SECTION A: MATH (10 QUESTIONS)
    {
      id: 1,
      section: "Math",
      text: "Solve for x in the equation: 5x + 15 = 40.",
      options: ["5", "8", "25", "55"],
      correctAnswer: 0,
      explanation: "5x + 15 = 40\n5x = 25\nx = 5"
    },
    {
      id: 2,
      section: "Math",
      text: "Which of the following is equal to 3/8?",
      options: ["0.30", "0.375", "0.45", "0.625"],
      correctAnswer: 1,
      explanation: "3/8 = 0.375"
    },
    {
      id: 3,
      section: "Math",
      text: "Calculate: (2³) × (3²)",
      options: ["6", "18", "72", "36"],
      correctAnswer: 2,
      explanation: "2³ = 8, 3² = 9, 8 × 9 = 72"
    },
    {
      id: 4,
      section: "Math",
      text: "A function is given by f(x) = 7x - 2. What is the slope of this function?",
      options: ["-2", "5", "7", "Cannot be determined"],
      correctAnswer: 2,
      explanation: "The slope of a linear function f(x) = mx + b is m. Here m = 7."
    },
    {
      id: 5,
      section: "Math",
      text: "Rearrange the formula y = 6x - 4 to express x in terms of y.",
      options: ["x = y/6 - 4", "x = (y + 4)/6", "x = 6y - 4", "x = (y - 4)/6"],
      correctAnswer: 1,
      explanation: "y = 6x - 4\ny + 4 = 6x\nx = (y + 4)/6"
    },
    {
      id: 6,
      section: "Math",
      text: "Given the system of equations:\nx + y = 10\nx - y = 2\nFind the value of x.",
      options: ["4", "6", "8", "12"],
      correctAnswer: 1,
      explanation: "Adding the equations: 2x = 12, so x = 6"
    },
    {
      id: 7,
      section: "Math",
      text: "If the total revenue function is R(x) = 120x - 2x², at which integer value of x is R(x) maximized?",
      options: ["15", "30", "60", "120"],
      correctAnswer: 1,
      explanation: "Taking derivative: R'(x) = 120 - 4x = 0\nx = 30"
    },
    {
      id: 8,
      section: "Math",
      text: "A product that costs $80 is discounted by 20%. What is the discounted price?",
      options: ["$64", "$72", "$80", "$96"],
      correctAnswer: 0,
      explanation: "$80 × 0.80 = $64"
    },
    {
      id: 9,
      section: "Math",
      text: "Simplify (3x + 2) - (x - 5)",
      options: ["2x - 3", "2x + 7", "4x - 3", "(3x + 2)(x - 5)"],
      correctAnswer: 1,
      explanation: "(3x + 2) - (x - 5) = 3x + 2 - x + 5 = 2x + 7"
    },
    {
      id: 10,
      section: "Math",
      text: "Factor out the common term in 6xy + 9y",
      options: ["3y(2x + 3)", "y(6x + 9)", "3(2xy + 3y)", "None of these"],
      correctAnswer: 0,
      explanation: "6xy + 9y = 3y(2x + 3)"
    },

    // SECTION B: STATISTICS (10 QUESTIONS)
    {
      id: 11,
      section: "Statistics",
      text: "A set of numbers is: {2, 5, 7, 9, 100}. Which statement is true?",
      options: ["The mean is less than the median", "The median is 7, and the mean is 24.6", "The median is 5, and the mean is 8.6", "The mean and median are the same"],
      correctAnswer: 1,
      explanation: "Median = 7, Mean = (2+5+7+9+100)/5 = 24.6"
    },
    {
      id: 12,
      section: "Statistics",
      text: "Name one other measure of dispersion besides the standard deviation.",
      options: ["Variance", "Interquartile range (IQR)", "Mean absolute deviation", "All of these"],
      correctAnswer: 3,
      explanation: "All listed options are valid measures of dispersion"
    },
    {
      id: 13,
      section: "Statistics",
      text: "A fair coin is tossed 3 times. What is the probability of getting exactly 2 heads?",
      options: ["1/4", "3/8", "3/4", "1/2"],
      correctAnswer: 1,
      explanation: "The combinations are HHT, HTH, THH out of 8 total possible outcomes"
    },
    {
      id: 14,
      section: "Statistics",
      text: "A box contains 5 blue balls and 5 red balls. You draw one ball at random. What is the probability it is red?",
      options: ["1/10", "1/4", "1/2", "3/4"],
      correctAnswer: 2,
      explanation: "5 red balls out of 10 total balls = 5/10 = 1/2"
    },
    {
      id: 15,
      section: "Statistics",
      text: "If a histogram of exam scores is left-skewed, it means:",
      options: ["Most students scored very high, with a few low outliers", "Most students scored very low, with a few high outliers", "The mean is definitely greater than the median", "The distribution is uniform"],
      correctAnswer: 0,
      explanation: "Left-skewed means the 'tail' is towards the lower end, so the majority of values are higher"
    },
    {
      id: 16,
      section: "Statistics",
      text: "In a group of 100 people, 40 are left-handed. Among the 40 left-handed people, 10 prefer tea over coffee. Among the 60 right-handed people, 15 prefer tea over coffee. What is the probability that a randomly chosen person is left-handed and prefers tea?",
      options: ["0.10", "0.25", "0.04", "0.16"],
      correctAnswer: 0,
      explanation: "10 out of 100 = 0.10"
    },
    {
      id: 17,
      section: "Statistics",
      text: "Given a sample: {4, 6, 6, 7, 9}, calculate the mean.",
      options: ["5.5", "6", "6.4", "7"],
      correctAnswer: 2,
      explanation: "(4+6+6+7+9)/5 = 32/5 = 6.4"
    },
    {
      id: 18,
      section: "Statistics",
      text: "Which statement best describes correlation?",
      options: ["It proves causation.", "It measures the degree of linear relationship between two variables.", "It only applies to normally distributed data.", "It is meaningless unless the sample size is 1,000 or more."],
      correctAnswer: 1,
      explanation: "Correlation is about the strength/direction of a linear relationship"
    },
    {
      id: 19,
      section: "Statistics",
      text: "Which of the following is a continuous probability distribution?",
      options: ["Binomial distribution", "Poisson distribution", "Normal distribution", "Geometric distribution"],
      correctAnswer: 2,
      explanation: "Normal distribution is continuous; the others listed are discrete"
    },
    {
      id: 20,
      section: "Statistics",
      text: "Why does a larger sample size generally reduce the margin of error in statistics?",
      options: ["Because observations become more accurate", "Because the standard error decreases as sample size increases", "Because larger samples always represent populations", "Because of confirmation bias"],
      correctAnswer: 1,
      explanation: "The standard error decreases as the sample size increases, leading to a smaller margin of error"
    },

    // SECTION C: BASIC ECONOMICS (10 QUESTIONS)
    {
      id: 21,
      section: "Basic Economics",
      text: "If the price of coffee decreases, ceteris paribus, we expect:",
      options: ["Demand for coffee increases", "Quantity demanded of coffee increases", "Supply of coffee increases", "Quantity supplied of coffee increases"],
      correctAnswer: 1,
      explanation: "A price drop leads to a movement along the demand curve, increasing quantity demanded"
    },
    {
      id: 22,
      section: "Basic Economics",
      text: "If the demand function is QD = 50 - 2P and the supply function is QS = 10 + 3P, find the equilibrium price P*.",
      options: ["5", "8", "10", "40"],
      correctAnswer: 1,
      explanation: "Set QD = QS: 50 - 2P = 10 + 3P, so 40 = 5P, thus P* = 8"
    },
    {
      id: 23,
      section: "Basic Economics",
      text: "If a 5% rise in the price of a product leads to a 10% drop in quantity demanded, the price elasticity of demand is:",
      options: ["-0.5", "-2.0", "2.0", "Cannot be determined from the information"],
      correctAnswer: 1,
      explanation: "Price elasticity = %ΔQ/%ΔP = -10%/5% = -2.0"
    },
    {
      id: 24,
      section: "Basic Economics",
      text: "Which factor can shift the demand curve for a good to the right?",
      options: ["An increase in consumer income (for normal goods)", "A decrease in the price of the good", "An increase in the price of complements", "An expectation of lower prices in the future"],
      correctAnswer: 0,
      explanation: "An increase in income shifts the demand curve to the right for normal goods"
    },
    {
      id: 25,
      section: "Basic Economics",
      text: "Which of the following is an example of a variable cost in the short run for a bakery?",
      options: ["Monthly rent", "Insurance payments", "Flour", "Annual business license"],
      correctAnswer: 2,
      explanation: "Flour usage depends on output level, so it's a variable cost"
    },
    {
      id: 26,
      section: "Basic Economics",
      text: "A competitive firm's total cost function is TC = 50 + 5Q. If the market price (P) is $8 per unit, how many units should the firm produce to maximize profit?",
      options: ["5 units", "10 units", "Unlimited (capacity constraint dependent)", "Zero units"],
      correctAnswer: 2,
      explanation: "Since P ($8) > MC ($5), the firm should produce as many units as possible, up to capacity constraints"
    },
    {
      id: 27,
      section: "Basic Economics",
      text: "Which market structure is characterized by many firms, each selling a differentiated product?",
      options: ["Perfect competition", "Monopoly", "Monopolistic competition", "Oligopoly"],
      correctAnswer: 2,
      explanation: "Monopolistic competition features many firms with differentiated products"
    },
    {
      id: 28,
      section: "Basic Economics",
      text: "Which of the following is primarily a macroeconomic issue?",
      options: ["A family deciding whether to buy a new car", "A bakery analyzing its marginal costs", "A nation's central bank setting interest rates", "A firm choosing to advertise in new markets"],
      correctAnswer: 2,
      explanation: "Central bank policy is macro in nature"
    },
    {
      id: 29,
      section: "Basic Economics",
      text: "You decide to quit your $50,000-per-year job to start a business. In the first year, you earn $40,000 profit. Ignoring all other factors, your opportunity cost is:",
      options: ["$40,000", "$10,000", "$50,000", "$90,000"],
      correctAnswer: 2,
      explanation: "The foregone salary ($50,000) is the opportunity cost"
    },
    {
      id: 30,
      section: "Basic Economics",
      text: "Which of these is an example of a market failure?",
      options: ["Negative externalities like pollution", "A store raising prices during high demand", "A company producing more than last year", "Consumers buying less when prices increase"],
      correctAnswer: 0,
      explanation: "Negative externalities represent a form of market failure where social costs exceed private costs"
    }
  ]
};
