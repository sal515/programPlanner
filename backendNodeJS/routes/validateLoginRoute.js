const express = require("express");
const router = express.Router();

const validateLoginController = require('../controllers/validateLoginController');

router.get("/validateLogin", validateLoginController.saveUserInfo);


module.exports = router;
