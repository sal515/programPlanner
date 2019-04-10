const express = require("express");
const router = express.Router();

const removeCourseController = require('../controllers/removeCourseController');

//route used to log in the user
router.get("", removeCourseController.removeCourse);

//Test route
router.get("/test", removeCourseController.TestRemoveCourse);

module.exports = router;
