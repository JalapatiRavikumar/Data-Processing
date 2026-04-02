const express = require("express");
const financialRecordController = require("../controllers/financialRecordController");
const authMiddleware = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");
const validate = require("../middleware/validateMiddleware");
const {
  createRecordValidation,
  updateRecordValidation,
  listRecordValidation
} = require("../validations/recordValidation");

const router = express.Router();

router.use(authMiddleware);

router.get("/", listRecordValidation, validate, financialRecordController.listRecords);
router.post(
  "/",
  allowRoles("analyst", "admin"),
  createRecordValidation,
  validate,
  financialRecordController.createRecord
);
router.put(
  "/:id",
  allowRoles("analyst", "admin"),
  updateRecordValidation,
  validate,
  financialRecordController.updateRecord
);
router.delete("/:id", allowRoles("analyst", "admin"), financialRecordController.deleteRecord);

module.exports = router;
