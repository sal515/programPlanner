const express = require("express");
const router = express.Router();

const frontend = require('../controllers/frontendRESTController');

router.post("/addCourse",frontend.addCourse );
// router.get("/addCourse", algorithm.addCourseToSequence);

module.exports = router;
