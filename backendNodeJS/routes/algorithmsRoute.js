const express = require("express");
const router = express.Router();

// const algorithm = require('../controllers/addCourseController');
// router.post("/addCourseToSequence", algorithm.addCourseToSequence);

const addCourseController = require('../controllers/addCourseController');
const populateSidebarController = require('../controllers/populateSidebarController');
const sectionsDataController = require('../controllers/sectionsDataController');
// const scheduleController = require('../controllers/scheduleController');


router.post("/addCourseToSequence", addCourseController.addCourseToSequence);
router.get("/getCourses", populateSidebarController.populateSidebar);
router.post("/getCourseCart", populateSidebarController.populateCourseCartCourses);
// router.post("/getAllSections", sectionsDataController.sendAllSections);
router.post("/getTutLabsSections", sectionsDataController.sendAllTutLabSections);
router.post("/getLecturesSections", sectionsDataController.sendAllLectures);
// router.post("/getSchedule", scheduleController.generateSchedules);


module.exports = router;
