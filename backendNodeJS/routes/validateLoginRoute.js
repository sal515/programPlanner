const express = require("express");
const router = express.Router();

const validateLoginController = require('../controllers/validateLoginController');

router.get("", validateLoginController.validateLogin);

module.exports = router;
