const express = require("express");
const router = express.Router();

const generateDataController = require('../controllers/generateDataController');

router.get("/generateCoursesSchedules", generateDataController.generateCoursesSchedules);
router.get("/generateTestStudents", generateDataController.genTestStudents);

module.exports = router;
