const express = require("express");
const router = express.Router();

const validateLoginController = require('../controllers/validateLoginController');

router.get("", validateLoginController.validateLogin);
router.get("/saveUserInfo", validateLoginController.saveUserInfo);

module.exports = router;
