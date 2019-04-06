const express = require("express");
const router = express.Router();

const generateDataController = require('../controllers/generateDataController');

router.get("/generateCoursesSchedules", generateDataController.generateCoursesSchedules);

router.get("/generateTestStudents", generateDataController.genTestStudents);

// router.get("/preRequisiteWithOr", genIdealController.generatePreReqORList;
// router.get("/preReqOnly", genIdealController.generatePreReqOnlyList;
// router.get("/coReqOnly", genIdealController.generateCoReqOnlyList;
// router.get("/notTaken", genIdealController.generateNotTakenList;
// router.get("/allScheduleClasses", genIdealController.generateScheduleList;

module.exports = router;
