const express = require("express");
const authController = require("../controllers/authController");
const validate = require("../middleware/validateMiddleware");
const { registerValidation, loginValidation } = require("../validations/authValidation");

const router = express.Router();

router.post("/register", registerValidation, validate, authController.register);
router.post("/login", loginValidation, validate, authController.login);

module.exports = router;
