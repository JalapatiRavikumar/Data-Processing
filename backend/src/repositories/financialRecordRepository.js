const mongoose = require("mongoose");
const FinancialRecord = require("../models/FinancialRecord");

const createRecord = (payload) => FinancialRecord.create(payload);

const findRecordById = (id) => FinancialRecord.findById(id);

const updateRecordById = (id, payload) =>
  FinancialRecord.findByIdAndUpdate(id, payload, { new: true, runValidators: true });

const deleteRecordById = (id) => FinancialRecord.findByIdAndDelete(id);

const getRecords = (query, pagination) =>
  FinancialRecord.find(query)
    .sort({ date: -1, createdAt: -1 })
    .skip(pagination.skip)
    .limit(pagination.limit);

const countRecords = (query) => FinancialRecord.countDocuments(query);

const aggregateCategoryWise = (userId, startDate, endDate) =>
  FinancialRecord.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
        ...(startDate && endDate ? { date: { $gte: startDate, $lte: endDate } } : {})
      }
    },
    {
      $group: {
        _id: "$category",
        totalAmount: { $sum: "$amount" }
      }
    },
    { $sort: { totalAmount: -1 } }
  ]);

const aggregateMonthlyTrends = (userId) =>
  FinancialRecord.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: {
          year: { $year: "$date" },
          month: { $month: "$date" },
          type: "$type"
        },
        totalAmount: { $sum: "$amount" }
      }
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } }
  ]);

const aggregateTotals = (userId) =>
  FinancialRecord.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: "$type",
        totalAmount: { $sum: "$amount" }
      }
    }
  ]);

module.exports = {
  createRecord,
  findRecordById,
  updateRecordById,
  deleteRecordById,
  getRecords,
  countRecords,
  aggregateCategoryWise,
  aggregateMonthlyTrends,
  aggregateTotals
};
