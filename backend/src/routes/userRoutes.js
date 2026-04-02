const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");
const validate = require("../middleware/validateMiddleware");
const { createUserValidation, updateUserValidation } = require("../validations/userValidation");

const router = express.Router();

router.use(authMiddleware);
router.use(allowRoles("admin"));

router.get("/", userController.getUsers);
router.post("/", createUserValidation, validate, userController.createUser);
router.put("/:id", updateUserValidation, validate, userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
