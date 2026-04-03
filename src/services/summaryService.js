import Record from "../models/recordModel.js";

export const getSummary = async (userId, query = {}) => {
  console.log("Calculating advanced summary...");

  const records = await Record.find({ user: userId });

  let income = 0, expense = 0;
  const categoryMap = {};
  const monthlyMap = {};
  let biggestExpense = null;

  records.forEach(r => {
    const amount = Number(r.amount);

    // Income / Expense
    if (r.type === "income") {
      income += amount;
    } else {
      expense += amount;

      // Track biggest expense
      if (!biggestExpense || amount > biggestExpense.amount) {
        biggestExpense = r;
      }
    }

    // Category breakdown
    if (!categoryMap[r.category]) {
      categoryMap[r.category] = 0;
    }
    categoryMap[r.category] += amount;

    // Monthly trend
    const month = new Date(r.createdAt).toISOString().slice(0, 7); // YYYY-MM
    if (!monthlyMap[month]) {
      monthlyMap[month] = { income: 0, expense: 0 };
    }

    if (r.type === "income") {
      monthlyMap[month].income += amount;
    } else {
      monthlyMap[month].expense += amount;
    }
  });

  // Savings rate
  const savingsRate = income > 0 ? ((income - expense) / income) * 100 : 0;

  // Top spending categories
  const topCategories = Object.entries(categoryMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  // Category percentage breakdown
  const expenseCategoryMap = {};

records.forEach(r => {
  const amount = Number(r.amount);

  if (r.type === "expense") {
    // Build expense-only category map
    if (!expenseCategoryMap[r.category]) {
      expenseCategoryMap[r.category] = 0;
    }
    expenseCategoryMap[r.category] += amount;
  }
});

// Now calculate percentage ONLY on expenses
const categoryPercentage = {};

Object.keys(expenseCategoryMap).forEach(cat => {
  categoryPercentage[cat] = expense > 0
    ? ((expenseCategoryMap[cat] / expense) * 100).toFixed(2)
    : "0.00";
});

  // Average daily spend
  const days = records.length > 0
    ? (new Date() - new Date(records[0].createdAt)) / (1000 * 60 * 60 * 24)
    : 1;

  const avgDailySpend = expense / days;

  // Burn rate (monthly expense projection)
  const burnRate = avgDailySpend * 30;

  return {
    totalIncome: income,
    totalExpense: expense,
    netBalance: income - expense,

    savingsRate: savingsRate.toFixed(2),

    categoryBreakdown: categoryMap,
    expenseBreakdown:expenseCategoryMap,
    categoryPercentage,

    topSpendingCategories: topCategories,

    monthlyTrend: monthlyMap,

    avgDailySpend: avgDailySpend.toFixed(2),
    burnRate: burnRate.toFixed(2),

    biggestExpense,

    recentTransactions: await Record.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(5)
  };
};