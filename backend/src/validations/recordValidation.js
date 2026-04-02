const { body, query } = require("express-validator");

const createRecordValidation = [
  body("amount").isFloat({ min: 0 }).withMessage("Amount must be a positive number"),
  body("type").isIn(["income", "expense"]).withMessage("Type must be income or expense"),
  body("category").trim().notEmpty().withMessage("Category is required"),
  body("date").isISO8601().withMessage("Date must be valid ISO date"),
  body("notes").optional().isString().withMessage("Notes must be a string")
];

const updateRecordValidation = [
  body("amount").optional().isFloat({ min: 0 }).withMessage("Amount must be a positive number"),
  body("type").optional().isIn(["income", "expense"]).withMessage("Type must be income or expense"),
  body("category").optional().trim().notEmpty().withMessage("Category cannot be empty"),
  body("date").optional().isISO8601().withMessage("Date must be valid ISO date"),
  body("notes").optional().isString().withMessage("Notes must be a string")
];

const listRecordValidation = [
  query("page").optional().isInt({ min: 1 }).withMessage("Page must be an integer >= 1"),
  query("limit").optional().isInt({ min: 1, max: 100 }).withMessage("Limit must be between 1 and 100"),
  query("type")
    .optional()
    .isIn(["income", "expense"])
    .withMessage("Type must be income or expense"),
  query("category").optional().isString().withMessage("Category must be string"),
  query("startDate").optional().isISO8601().withMessage("startDate must be valid ISO date"),
  query("endDate").optional().isISO8601().withMessage("endDate must be valid ISO date")
];

module.exports = {
  createRecordValidation,
  updateRecordValidation,
  listRecordValidation
};
