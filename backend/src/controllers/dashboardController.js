const dashboardService = require("../services/dashboardService");
const asyncHandler = require("../utils/asyncHandler");

const getDashboardSummary = asyncHandler(async (req, res) => {
  const summary = await dashboardService.getDashboardSummary(
    req.user.id,
    req.query.startDate,
    req.query.endDate
  );
  res.status(200).json(summary);
});

module.exports = {
  getDashboardSummary
};
