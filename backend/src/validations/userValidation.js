const { body } = require("express-validator");

const createUserValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("role")
    .isIn(["viewer", "analyst", "admin"])
    .withMessage("Invalid role value"),
  body("status")
    .optional()
    .isIn(["active", "inactive"])
    .withMessage("Invalid status value")
];

const updateUserValidation = [
  body("name").optional().trim().notEmpty().withMessage("Name cannot be empty"),
  body("email").optional().isEmail().withMessage("Valid email is required"),
  body("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("role")
    .optional()
    .isIn(["viewer", "analyst", "admin"])
    .withMessage("Invalid role value"),
  body("status")
    .optional()
    .isIn(["active", "inactive"])
    .withMessage("Invalid status value")
];

module.exports = {
  createUserValidation,
  updateUserValidation
};
