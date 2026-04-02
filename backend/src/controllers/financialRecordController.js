const financialRecordService = require("../services/financialRecordService");
const asyncHandler = require("../utils/asyncHandler");

const createRecord = asyncHandler(async (req, res) => {
  const record = await financialRecordService.createRecord(req.user.id, req.body);
  res.status(201).json({ record });
});

const listRecords = asyncHandler(async (req, res) => {
  const result = await financialRecordService.listRecords(req.user.id, req.query);
  res.status(200).json(result);
});

const updateRecord = asyncHandler(async (req, res) => {
  const record = await financialRecordService.updateRecord(req.user.id, req.params.id, req.body);
  res.status(200).json({ record });
});

const deleteRecord = asyncHandler(async (req, res) => {
  await financialRecordService.deleteRecord(req.user.id, req.params.id);
  res.status(204).send();
});

module.exports = {
  createRecord,
  listRecords,
  updateRecord,
  deleteRecord
};
