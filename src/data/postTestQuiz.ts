
import { Quiz } from "@/types/quiz";

export const foundationalPostTest: Quiz = {
  id: 201,
  title: "Foundational Economics Post-Test",
  description: "Final comprehensive assessment to evaluate your understanding of foundational economic concepts after completing the course.",
  category: "foundational",
  duration: 75, // 60-75 minutes suggested
  questions: [
    // SECTION A: MATH (10 QUESTIONS)
    {
      id: 1,
      section: "Section A: Math",
      text: "A firm's profit Π (in $) depends on the price P they set for their product, according to: Π(P) = -2P² + 40P - 80. What value of P maximizes Π?",
      options: ["P = 5", "P = 10", "P = 15", "P = 20"],
      correctAnswer: 1,
      explanation: "To find the maximum, we can express Π(P) in vertex form as -2(P-10)² + 120, which reaches its maximum at P = 10."
    },
    {
      id: 2,
      section: "Section A: Math",
      text: "You manage a restaurant. Your system of equations for daily revenue (in $) is: {10B + 2D = 580, 10B + 2D = 700} where B = burgers sold, D = drinks sold. Which statement is true?",
      options: [
        "This system has a unique solution, meaning the day's revenue can be accurately calculated.",
        "There is no solution, implying an inconsistency in recorded data or prices.",
        "There are infinitely many solutions, so your prices are not well-defined.",
        "The system suggests your burger price changed halfway through the day."
      ],
      correctAnswer: 1,
      explanation: "The left sides of both equations are identical (10B + 2D), but the right sides are different (580 vs. 700), indicating an inconsistency in the data."
    },
    {
      id: 3,
      section: "Section A: Math",
      text: "Solve the inequality: x² - 5x + 6 ≤ 0.",
      options: ["x ≤ 2 or x ≥ 3", "2 ≤ x ≤ 3", "x ≤ -2 or x ≥ -3", "No real solution"],
      correctAnswer: 1,
      explanation: "The roots are 2 and 3, and the parabola opens upward, so the ≤ 0 region is between the roots (2 ≤ x ≤ 3)."
    },
    {
      id: 4,
      section: "Section A: Math",
      text: "A quantity grows according to A(t) = A₀·e^(0.05t). After 2 years, the quantity is 20% larger than the initial amount. What is the value of e^0.1?",
      options: ["1.052", "1.105", "1.200", "1.221"],
      correctAnswer: 2,
      explanation: "We have A(2) = 1.2·A₀ = A₀·e^(0.05×2) = A₀·e^0.1, so e^0.1 = 1.2."
    },
    {
      id: 5,
      section: "Section A: Math",
      text: "Solve for x: ln(x) = 2.",
      options: ["x = e²", "x = ln(2)", "x = 2", "No real solution"],
      correctAnswer: 0,
      explanation: "ln(x) = 2 ⇒ x = e² ≈ 7.389."
    },
    {
      id: 6,
      section: "Section A: Math",
      text: "For the function f(x) = |x - 2|, which statement is incorrect?",
      options: [
        "f(x) is always nonnegative.",
        "f(2) = 0.",
        "f(x) is a straight line for x < 2 and another straight line for x > 2.",
        "f'(2) exists and equals 0."
      ],
      correctAnswer: 3,
      explanation: "f'(2) does not exist because the function has a 'kink' at x = 2."
    },
    {
      id: 7,
      section: "Section A: Math",
      text: "You have three class sections with 20, 30, and 50 students, with average exam scores of 75, 80, and 70. What is the overall average score across all 100 students?",
      options: ["75.0", "73.5", "74.0", "75.5"],
      correctAnswer: 2,
      explanation: "Weighted average = (20×75 + 30×80 + 50×70) ÷ 100 = (1500 + 2400 + 3500) ÷ 100 = 7400 ÷ 100 = 74.0."
    },
    {
      id: 8,
      section: "Section A: Math",
      text: "A firm's revenue function is R(x) = x(100 - x). Without using derivatives, which integer value of x maximizes R?",
      options: ["25", "50", "75", "100"],
      correctAnswer: 1,
      explanation: "R(x) = 100x - x². Completing the square: R(x) = -(x - 50)² + 2500, which reaches its maximum at x = 50."
    },
    {
      id: 9,
      section: "Section A: Math",
      text: "If you receive $100 in two years, and the annual discount rate is 10%, what's the present value (PV)?",
      options: ["$81.00", "$82.64", "$90.91", "$100.00"],
      correctAnswer: 1,
      explanation: "PV = 100 ÷ (1.10)² = 100 ÷ 1.21 = $82.64."
    },
    {
      id: 10,
      section: "Section A: Math",
      text: "You have sets A and B in a universal set U. You know that |A ∪ B| = 30, |A ∩ B| = 5, and |A| = 20. What is |B|?",
      options: [
        "|B| = |A ∩ B| + |A ∪ B|",
        "|B| = |A ∪ B| - |A ∩ B|",
        "|B| = (|A| + |B|) - |A ∩ B|",
        "|B| = |A ∪ B| - |A| + |A ∩ B|"
      ],
      correctAnswer: 3,
      explanation: "|B| = |A ∪ B| - |A| + |A ∩ B| = 30 - 20 + 5 = 15."
    },

    // SECTION B: STATISTICS (10 QUESTIONS)
    {
      id: 11,
      section: "Section B: Statistics",
      text: "A class's exam scores have a mean of 75, a median of 78, and a standard deviation of 12. Which statement is most likely true?",
      options: [
        "The distribution is perfectly symmetric around the mean of 75.",
        "The distribution is negatively skewed with a left tail (mean < median).",
        "The distribution is positively skewed with a right tail (mean < median).",
        "The distribution is negatively skewed with a left tail (mean > median)."
      ],
      correctAnswer: 1,
      explanation: "If the mean (75) is less than the median (78), it implies a left-skew or negative skew."
    },
    {
      id: 12,
      section: "Section B: Statistics",
      text: "In a sample of 100 observations, the sample mean is 50, and the population standard deviation is known to be 10. What is the 95% confidence interval for the population mean?",
      options: ["(48.04, 51.96)", "(49.02, 50.98)", "(47.50, 52.50)", "(45.00, 55.00)"],
      correctAnswer: 0,
      explanation: "Margin of Error = z_(α/2) × σ/√n = 1.96 × 10/√100 = 1.96. C.I. = 50 ± 1.96 = (48.04, 51.96)."
    },
    {
      id: 13,
      section: "Section B: Statistics",
      text: "You run a two-sided hypothesis test at α = 0.05. Your p-value is 0.03. What do you conclude?",
      options: [
        "Fail to reject H₀, because p-value < α.",
        "Reject H₀, because p-value < α.",
        "Accept H₀, because p-value < α.",
        "Test is inconclusive without effect size."
      ],
      correctAnswer: 1,
      explanation: "p-value < α (0.03 < 0.05) => reject H₀."
    },
    {
      id: 14,
      section: "Section B: Statistics",
      text: "Given data for 'Time spent studying (hours)' (X) and 'Test score' (Y) for 4 students showing a clear positive trend, which statement is most likely true about the correlation r?",
      options: [
        "r is close to +1 (strong positive)",
        "r is close to –1 (strong negative)",
        "r is around 0 (no relationship)",
        "Not enough information to determine"
      ],
      correctAnswer: 0,
      explanation: "When study hours increase and test scores also increase, this indicates a strong positive correlation (r close to +1)."
    },
    {
      id: 15,
      section: "Section B: Statistics",
      text: "From a standard 52-card deck, what is the probability of drawing an Ace or a King in one draw?",
      options: ["4+4/52 = 8/52 = 2/13", "4×4/52 = 16/52", "8/52 = 8/13", "4/52"],
      correctAnswer: 0,
      explanation: "There are 4 Aces and 4 Kings in a deck, so probability = (4+4)/52 = 8/52 = 2/13."
    },
    {
      id: 16,
      section: "Section B: Statistics",
      text: "If events occur at an average rate of 3 per hour, what is the probability that exactly 0 events occur in a given hour?",
      options: ["e^(-3)", "3e^(-3)", "3^0/0! × e^(-3)", "1 - e^(-3)"],
      correctAnswer: 2,
      explanation: "For a Poisson distribution, P(X=0) = λ^0 × e^(-λ)/0! = e^(-3) ≈ 0.0498."
    },
    {
      id: 17,
      section: "Section B: Statistics",
      text: "You have two classes: Class A (mean=70, variance=9) with 10 students, and Class B (mean=80, variance=16) with 20 students. What is the overall mean?",
      options: ["75.0", "76.67", "77.5", "73.33"],
      correctAnswer: 1,
      explanation: "Overall Mean = (10×70 + 20×80)/30 = (700 + 1600)/30 = 2300/30 = 76.67."
    },
    {
      id: 18,
      section: "Section B: Statistics",
      text: "Which statement is true about the Central Limit Theorem (CLT)?",
      options: [
        "It states any individual observation is normally distributed.",
        "It states the distribution of sample means approaches normal as sample size grows.",
        "It only applies if the population is already normally distributed.",
        "It does not apply to large samples."
      ],
      correctAnswer: 1,
      explanation: "The CLT states that the sampling distribution of the mean approaches a normal distribution as the sample size gets larger, regardless of the population distribution."
    },
    {
      id: 19,
      section: "Section B: Statistics",
      text: "If your test's α is 0.01, which of the following is correct?",
      options: [
        "You have a 1% chance of incorrectly rejecting the null hypothesis when it is true.",
        "You have a 1% chance of incorrectly failing to reject the null hypothesis when it is false.",
        "α measures the power of the test.",
        "None of the above."
      ],
      correctAnswer: 0,
      explanation: "α is the probability of making a Type I error (rejecting H₀ when it's actually true)."
    },
    {
      id: 20,
      section: "Section B: Statistics",
      text: "Which statement best describes the Interquartile Range (IQR)?",
      options: [
        "It's the difference between the highest and lowest observations.",
        "It's the median of the data set.",
        "It's the difference between the 25th and 75th percentiles.",
        "It's always smaller than the standard deviation."
      ],
      correctAnswer: 2,
      explanation: "The IQR is the difference between the first quartile (25th percentile) and the third quartile (75th percentile)."
    },

    // SECTION C: ECONOMICS (10 QUESTIONS)
    {
      id: 21,
      section: "Section C: Economics",
      text: "If supply shifts right and demand stays the same, which outcome is most likely?",
      options: [
        "Price rises, quantity sold decreases.",
        "Price falls, quantity sold increases.",
        "Price stays the same, quantity stays the same.",
        "Demand curve shifts along with supply."
      ],
      correctAnswer: 1,
      explanation: "When supply increases (shifts right), with demand unchanged, it creates a surplus at the old price, pushing prices down and quantity sold up."
    },
    {
      id: 22,
      section: "Section C: Economics",
      text: "Which best describes consumer surplus?",
      options: [
        "The price consumers pay minus the cost of production",
        "The difference between the highest price a consumer is willing to pay and the actual price",
        "The area above the supply curve and below the price line",
        "The marginal cost of the last unit sold"
      ],
      correctAnswer: 1,
      explanation: "Consumer surplus is the difference between what consumers are willing to pay and what they actually pay."
    },
    {
      id: 23,
      section: "Section C: Economics",
      text: "If a 5% increase in the price of laptops decreases quantity demanded by 12%, what is the price elasticity of demand? Is it elastic or inelastic?",
      options: ["-0.4 (inelastic)", "-1.2 (elastic)", "-2.4 (elastic)", "2.4 (elastic)"],
      correctAnswer: 2,
      explanation: "Price elasticity = % change in quantity / % change in price = -12% / 5% = -2.4. This is elastic because |2.4| > 1."
    },
    {
      id: 24,
      section: "Section C: Economics",
      text: "A paper mill pollutes a river, affecting a downstream fishery. This is an example of:",
      options: ["Positive externality", "Negative externality", "Public good", "Natural monopoly"],
      correctAnswer: 1,
      explanation: "This is a negative externality, as the paper mill's actions impose costs on third parties (the fishery) that aren't reflected in the market price."
    },
    {
      id: 25,
      section: "Section C: Economics",
      text: "A monopolist faces an inverse demand function P = 100 - 2Q and total cost function TC = 20Q. What is the profit-maximizing quantity?",
      options: ["Q = 10", "Q = 20", "Q = 30", "Q = 40"],
      correctAnswer: 1,
      explanation: "MR = 100 - 4Q and MC = 20. Set MR = MC: 100 - 4Q = 20 → 4Q = 80 → Q* = 20."
    },
    {
      id: 26,
      section: "Section C: Economics",
      text: "Which best describes Gross Domestic Product (GDP)?",
      options: [
        "The total income earned by a nation's permanent residents",
        "The total market value of all final goods and services produced within a country in a given period",
        "The difference between government taxes and government spending",
        "The total value of all intermediate and final goods produced worldwide"
      ],
      correctAnswer: 1,
      explanation: "GDP measures the total market value of all final goods and services produced within a country's borders in a specific time period."
    },
    {
      id: 27,
      section: "Section C: Economics",
      text: "You can spend $1000 on advertising or invest it in a bond paying 5% interest. If advertising yields $50 in additional sales, what is your opportunity cost?",
      options: ["$0", "$50", "$1000", "$1050"],
      correctAnswer: 1,
      explanation: "The opportunity cost is the $50 interest you could have earned from the bond investment."
    },
    {
      id: 28,
      section: "Section C: Economics",
      text: "Two firms can either Advertise (A) or Not Advertise (N). If both firms have a dominant strategy of Advertise, what is the Nash Equilibrium?",
      options: ["(A,A)", "(A,N)", "(N,A)", "(N,N)"],
      correctAnswer: 0,
      explanation: "If Advertise is a dominant strategy for both firms, they will both choose it, leading to a Nash Equilibrium at (A,A)."
    },
    {
      id: 29,
      section: "Section C: Economics",
      text: "If a government wants to stimulate the economy in the short run, which fiscal policy is it most likely to use?",
      options: [
        "Increase taxes, reduce government spending",
        "Decrease taxes, increase government spending",
        "Implement price controls",
        "Do nothing"
      ],
      correctAnswer: 1,
      explanation: "To stimulate the economy, governments typically use expansionary fiscal policy: cutting taxes to increase disposable income and increasing spending to boost aggregate demand."
    },
    {
      id: 30,
      section: "Section C: Economics",
      text: "How does the microeconomic concept of elasticity relate to macroeconomic tax policy?",
      options: [
        "It doesn't - micro and macro concepts aren't related",
        "Tax revenue depends on the price elasticity of demand for taxed goods",
        "Elasticity only matters for individual firms, not government policy",
        "Tax policies always assume unit elasticity for simplicity"
      ],
      correctAnswer: 1,
      explanation: "When governments design tax policies, they must consider elasticity. Highly inelastic goods can be taxed more without significant reduction in quantity demanded, potentially generating more revenue."
    }
  ],
  isPostTest: true,
  passingScore: 60, // Updated from 75% to 60%
  sectionsConfig: {
    sections: [
      { name: "Section A: Math", passingScore: 60 },
      { name: "Section B: Statistics", passingScore: 60 },
      { name: "Section C: Economics", passingScore: 60 }
    ],
    requireAllSections: true
  }
};
