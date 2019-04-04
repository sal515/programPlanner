const express = require("express");
const router = express.Router();

const addCourseController = require('../controllers/addCourseController');
const populateSidebarController = require('../controllers/populateSidebarController');


router.post("/addCourseToSequence", addCourseController.addCourseToSequence);
router.get("/getCourses", populateSidebarController.populateSidebar);


module.exports = router;
