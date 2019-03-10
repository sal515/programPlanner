const express = require("express");
const router = express.Router();

const genIdealController = require('../controllers/generateSequences');

// TODO: FIX ROUTE - Doesn't make sense now since test is done
router.post("", genIdealController.saveCourse );
// TODO: FIX ROUTE - Doesn't make sense now since test is done
router.get("", genIdealController.retrieveCourse);

router.get("/preRequisiteWithOr", genIdealController.generatePreReqORList);

module.exports = router;
