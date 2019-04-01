// variable holding the references of dbhelper methods
const dbHelpers = require("../databaseHandlers/dbHelper");
// variables holding the references of the object creation helper methods
const dataHandlers = require("../dataHandlers/objectGenerator");
//importing lodash library
var _ = require('lodash');

// Example of using the examples reference file examples.testingFunc();
const examples = require("./referenceExamples");

var exports = module.exports = {};

// WORKAROUND : the directory path are declared separate -- this allows Webstorm to detect the model functions
const modelDirectory = '../models/';
const DbSchemeDirectory = '../models/DbSchemas/';

// importing schema to save data to the default database
const coReqOnlyModel = require('../models/DbSchemas/coReqOnlySchema2Model');
const notTakenModel = require('../models/DbSchemas/notTakenSchemas2Model');
const preReqOnlyModel = require('../models/DbSchemas/preReqOnlySchema2Model');
const preReqORModel = require('../models/DbSchemas/preReqORSchema2Model');

const scheduleModel = require(DbSchemeDirectory + 'scheduleSchema2Model');
// importing the user profiles
const userProfileModel = require(modelDirectory + 'userSchema2Model');


exports.addCourseToSequence = (req, res, next) => {
  // postman choose: x-www-form-urlencoded  to test data flow from front to backend
  const userInput = req.body;
  // setting the mongoose debugging to true
  const mongoose = require("mongoose");
  mongoose.set('debug', true);

  // connect to database
  dbHelpers.defaultConnectionToDB();

  /*
  * This is the async sub controller that lets me call all the functions sequentially
  * This is used to controller the async nature of the JS, ->> to be able to write sequential
  * Allows us to avoid "callback hell"  <<-- NOT SOMETHING I CAME UP WITH
  * */
  asyncAddCourseSubController(userInput, req, res, next);


  res.status(200).json({
    status: 200,
    message: "Course Added to the Schedule"
  });


};


/*
* @param req
* The req.body should give me the following values
* UserID
* Semester
* Course Subject
* Course Code
*
* @return
* isCourseGivenDuringSemesterBool
* hasNotTakenBool
* hasPreReqBool
* hasCoReqBool
* */
async function asyncAddCourseSubController(userInput, req, res, next) {
  // Logic control variables declared
  let isCourseGivenDuringSemesterBool = true;
  let hasPreReqBool = true;
  let hasCoReqBool = true;
  let hasNotTakenBool = true;


  // ==========  checking if the course is provided during the semester  ==========
  const foundRandomSectionOfRequestedCourse = await isCourseGivenDuringSemester(userInput, req, res, next).catch((error) => {
    console.log("Error occurred in the database function: " + error)
  });
  if (foundRandomSectionOfRequestedCourse == null) {
    isCourseGivenDuringSemesterBool = false;
    console.log("The requested course wasn't found");
    return;
  }
  // Test print to see if the course was found or not. -> PASSED
  // console.log(isCourseGivenDuringSemesterBool );
  // ==========  checking if the course is provided during the semester  ==========




}






function isCourseGivenDuringSemester(userInput, req, res, next) {
  return new Promise((resolve, reject) => {
    // ============= How to do query ===================================
    // ======== Check if the course Exists =======================
    // const query = scheduleModel.find();
    const query = scheduleModel.findOne();
    query.setOptions({lean: true});
    query.collection(scheduleModel.collection);
    // example to do the query in one line
    // query.where('object.courseSubject').equals(userInput.courseSubject).exec(function (err, scheduleModel) {
    // building a query with multiple where statements
    query.where('object.courseSubject').equals(userInput.courseSubject);
    query.where('object.courseCatalog').equals(userInput.courseCatalog);
    // query.where('object.termTitle').equals(userInput.termTitle);
    query.where('object.termDescription').equals(userInput.termDescription);
    query.exec((err, result) => {
      // console.log("From the sub function: " + query);
      resolve(result);
      reject(err);
    })
  });
}
