const express = require("express");
const router = express.Router();

const validateLoginController = require('../controllers/validateLoginController');

//route used to log in the user
router.get("", validateLoginController.validateLogin);
//route to create a test user
//username: test && password: 123
router.get("/saveUserInfo", validateLoginController.saveUserInfo);

module.exports = router;
