const financialRecordRepository = require("../repositories/financialRecordRepository");
const ApiError = require("../utils/ApiError");

const buildRecordQuery = (userId, filters) => {
  const query = { userId };

  if (filters.type) {
    query.type = filters.type;
  }
  if (filters.category) {
    query.category = filters.category;
  }
  if (filters.startDate && filters.endDate) {
    query.date = {
      $gte: new Date(filters.startDate),
      $lte: new Date(filters.endDate)
    };
  }
  return query;
};

const createRecord = (userId, payload) =>
  financialRecordRepository.createRecord({
    ...payload,
    userId
  });

const listRecords = async (userId, filters) => {
  const page = Number(filters.page || 1);
  const limit = Number(filters.limit || 10);
  const skip = (page - 1) * limit;
  const query = buildRecordQuery(userId, filters);

  const [records, total] = await Promise.all([
    financialRecordRepository.getRecords(query, { skip, limit }),
    financialRecordRepository.countRecords(query)
  ]);

  return {
    records,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit)
    }
  };
};

const updateRecord = async (userId, recordId, payload) => {
  const existingRecord = await financialRecordRepository.findRecordById(recordId);
  if (!existingRecord || existingRecord.userId.toString() !== userId) {
    throw new ApiError(404, "Record not found");
  }

  return financialRecordRepository.updateRecordById(recordId, payload);
};

const deleteRecord = async (userId, recordId) => {
  const existingRecord = await financialRecordRepository.findRecordById(recordId);
  if (!existingRecord || existingRecord.userId.toString() !== userId) {
    throw new ApiError(404, "Record not found");
  }

  await financialRecordRepository.deleteRecordById(recordId);
};

module.exports = {
  createRecord,
  listRecords,
  updateRecord,
  deleteRecord
};
