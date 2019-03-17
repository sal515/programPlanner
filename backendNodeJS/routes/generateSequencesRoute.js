const express = require("express");
const router = express.Router();

const genIdealController = require('../controllers/generateSequencesController');

router.get("/populateDatabase", genIdealController.populateDatabase);

// router.get("/preRequisiteWithOr", genIdealController.generatePreReqORList;
// router.get("/preReqOnly", genIdealController.generatePreReqOnlyList;
// router.get("/coReqOnly", genIdealController.generateCoReqOnlyList;
// router.get("/notTaken", genIdealController.generateNotTakenList;
// router.get("/allScheduleClasses", genIdealController.generateScheduleList;

module.exports = router;
