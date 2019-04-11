const express = require("express");
const router = express.Router();

// const algorithm = require('../controllers/addCourseController');
// router.post("/addCourseToSequence", algorithm.addCourseToSequence);

const addCourseController = require('../controllers/addCourseController');
const populateSidebarController = require('../controllers/populateSidebarController');


router.post("/addCourseToSequence", addCourseController.addCourseToSequence);
router.get("/getCourses", populateSidebarController.populateSidebar);
router.post("/getCourseCart", populateSidebarController.populateCourseCartCourses);



module.exports = router;
