const financialRecordRepository = require("../repositories/financialRecordRepository");

const getDashboardSummary = async (userId, startDate, endDate) => {
  const totals = await financialRecordRepository.aggregateTotals(userId);
  const categoryWise = await financialRecordRepository.aggregateCategoryWise(
    userId,
    startDate ? new Date(startDate) : null,
    endDate ? new Date(endDate) : null
  );
  const monthlyTrendsRaw = await financialRecordRepository.aggregateMonthlyTrends(userId);

  const totalIncome = totals.find((item) => item._id === "income")?.totalAmount || 0;
  const totalExpenses = totals.find((item) => item._id === "expense")?.totalAmount || 0;
  const netBalance = totalIncome - totalExpenses;

  const monthlyMap = new Map();
  monthlyTrendsRaw.forEach((item) => {
    const key = `${item._id.year}-${item._id.month}`;
    if (!monthlyMap.has(key)) {
      monthlyMap.set(key, {
        month: key,
        income: 0,
        expense: 0
      });
    }
    monthlyMap.get(key)[item._id.type] = item.totalAmount;
  });

  return {
    totalIncome,
    totalExpenses,
    netBalance,
    categoryWise: categoryWise.map((item) => ({
      category: item._id,
      totalAmount: item.totalAmount
    })),
    monthlyTrends: Array.from(monthlyMap.values())
  };
};

module.exports = {
  getDashboardSummary
};
