// variable holding the references of dbhelper methods
const dbHelpers = require("../databaseHandlers/dbHelper");
// variables holding the references of the object creation helper methods
const dataHandlers = require("../dataHandlers/objectGenerator");
//importing lodash library
var _ = require('lodash');


// importing the user profiles
const addCourseModel = require('../models/frontendModels/addCourseSchema2Model');

/**
 * Find User and Check if we can Add Course to the User
 *
 *
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.addCourse = (req, res, next) => {
  // user input should have the following:
  //  -> userID
  //  -> Semester selected
  //  -> Course Subject
  //  -> Course Code

  const addCourseData = req.body;

  // testing if the REST End-Point is working
  console.log(addCourseData.userID);
  console.log(addCourseData.courseSubject);
  console.log(addCourseData.courseCatalog);
  console.log(addCourseData.termDescription);
  if (addCourseData.userID !== "" && addCourseData.courseSubject !== "" && addCourseData.courseCatalog !== "" && addCourseData.termDescription !== "") {
    res.status(200).json({
      message: "Course received",
      status: 200
    });
  } else {
    res.status(400).json({
      message: "400 Bad Request",
      status: 400
    });

  }

  // check in the database if it exits for the semester
  // check for not taken in the db
  // check in the database for prereq
  // check for coreq

  // generation algorithm
  // generate possible sequences and store it to db
  // check for duplicates

  // send the schedules generated to the frontend calendar
  // call front-end rest api?? possible??




};


