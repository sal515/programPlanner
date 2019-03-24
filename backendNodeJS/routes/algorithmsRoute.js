const express = require("express");
const router = express.Router();

const algorithm = require('../controllers/algorithmsController');

router.post("/addCourseToSequence", algorithm.addCourseToSequence);

module.exports = router;
