const express = require("express");
const router = express.Router();

const genIdealSequenceController = require('../controllers/generateIdealSequences');

router.post("", genIdealSequenceController.saveCourse );

router.get("", genIdealSequenceController.retrieveCourse);

module.exports = router;
