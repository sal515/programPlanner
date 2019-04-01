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
const preReqOnlyModel = require('../models/DbSchemas/preReqOnlySchema2Model');
const preReqORModel = require('../models/DbSchemas/preReqORSchema2Model');

const scheduleModel = require(DbSchemeDirectory + 'scheduleSchema2Model');
const notTakenModel = require(DbSchemeDirectory + 'notTakenSchemas2Model');

// importing the user profiles
const userProfileModel = require(modelDirectory + 'userSchema2Model');


exports.addCourseToSequence = (req, res, next) => {
  // postman choose: x-www-form-urlencoded  to test data flow from front to backend
  /*
  * userInput has:
  * userID
  * courseSubject
  * courseCatalog
  * termDescription
  * */
  const userInput = req.body;
  // setting the mongoose debugging to true
  // const mongoose = require("mongoose");
  // mongoose.set('debug', true);

  // connect to database
  dbHelpers.defaultConnectionToDB();


  /*
  * This is the async sub controller that lets me call all the functions sequentially
  * This is used to controller the async nature of the JS, ->> to be able to write sequential
  * Allows us to avoid "callback hell"  <<-- NOT SOMETHING I CAME UP WITH
  * */
  asyncAddCourseSubController(userInput, req, res, next);

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
  // Logic control variables Initialization
  // isCourseGivenDuringSemesterBool = false;
  // hasPreReqBool = false;
  // hasCoReqBool = false;
  // notTakenBeforeBool = false;
  // alreadyInCartBool = false;
  var statusObj = new addCourseStatus(false, false, false, false, false);

  // function variables declared
  let courseSubCat2Check = userInput.courseSubject + userInput.courseCatalog;
  let allCoursesTakenByUserArr = [];
  let allNotTakenCoursesToCheckMap = new Map();

  // ==========  checking if the course is provided during the semester  ==========
  try {


    // ==========  checking if the student has the course in cart already  ==========
    const userProfilesPromise = await findUserProfileFunc(userInput, req, res, next).catch((error) => {
      console.log("Error occurred in the database function: " + error)
    });
    // console.log(typeof userProfilesPromise);
    let semesterKeysArr = Object.keys(userProfilesPromise.courseHistory);
    let tmpCoursesArr = [];
    // console.log(userProfilesPromise.courseHistory["Fall 2016"][0]);
    semesterKeysArr.forEach((semesterKey) => {
        // console.log(semesterKey);
        // console.log(userProfilesPromise.courseHistory[semesterKey][0]);
        tmpCoursesArr = userProfilesPromise.courseHistory[semesterKey];
        tmpCoursesArr.forEach((course) => {
          // console.log(course);
          // if ((courseSubCat2Check === course)) {
          // statusObj.setAlreadyInCartBool(true);
          // throw "break2: The student is already registered for the course";
          // }
          allCoursesTakenByUserArr.push(course);
        });
      }
    );
    // statusObj.setAlreadyInCartBool(false);
    console.log(allCoursesTakenByUserArr);


    debug = false;
    if (debug) {

      const foundRandomSectionOfRequestedCoursePromise = await isCourseGivenDuringSemesterFunc(userInput, req, res, next).catch((error) => {
        console.log("Error occurred in the database function: " + error)
      });
      if (foundRandomSectionOfRequestedCoursePromise == null) {
        console.log("The requested course wasn't found");
        throw "break1 : Course is not given during selected Semester";
      }
      statusObj.setIsCourseGivenDuringSemesterBool(true);
      // Test print to see if the course was found or not. -> PASSED
      // console.log(statusObj.getIsCourseGivenDuringSemesterBool());

    }


    // ==========  checking if the student already took a similar course from the Not taken list before ==========
    let courseSub2Check = userInput.courseSubject;
    let courseCat2Check = userInput.courseCatalog;
    // let courseSubCat2Check = userInput.courseSubject + userInput.courseCatalog;

    const notTakenPromise = await notTakenFunc(userInput, req, res, next).catch((err) => {
      console.log("Error occurred in the database function" + err);
    });

    // let tempNotTakenObj;
    // let notTakenKeys = Object.keys(notTakenPromise[0].object);
    notTakenPromise.forEach((notTakenObj) => {
      notTakenObjKeysArr = Object.keys(notTakenObj.object);
      notTakenObjKeysArr.splice(0, 3);
      // console.log(notTakenObj);
      // console.log(notTakenObjKeysArr);
      notTakenObjKeysArr.forEach((key) => {
        if (!(notTakenObj.object[key] === "")) {
          // console.log(notTakenObj.object[key]);
          allNotTakenCoursesToCheckMap.set(notTakenObj.object[key], "");
        }
      });
    });
    // console.log(allNotTakenCoursesToCheckMap);
    // ============== Checking if the user has taken any course from the Not taken list ===================
    allCoursesTakenByUserArr.forEach((userTakenCourse) => {
      if (allNotTakenCoursesToCheckMap.has(userTakenCourse)) {
        console.log("User took a similar course");
      }
      // console.log("User did NOT take a similar course");
    })

    // console.log(allNotTakenCoursesToCheckMap);
    // console.log(notTakenKeys);
    // console.log(notTakenPromise.length);







  } catch (condition) {
    console.log(condition);
  }


  res.status(200).json({
    "status": 200,
    "isCourseGivenDuringSemesterBool": statusObj.getIsCourseGivenDuringSemesterBool(),
    "hasPreReqBool": statusObj.getHasPreReqBool(),
    "hasCoReqBool": statusObj.getHasCoReqBool(),
    "notTakenBool": statusObj.getNotTakenBool(),
    "alreadyInCartBool": statusObj.getAlreadyInCartBool()

  });


  // return new Promise(resolve => {
  //   resolve(statusObj);
  // });

}













function notTakenFunc(userInput, req, res, next) {
  return new Promise((resolve, reject) => {
    // ============= How to do query ===================================
    // ======== Check if the course Exists =======================
    // const query = scheduleModel.find();
    const query = notTakenModel.find();
    query.setOptions({lean: true});
    query.collection(notTakenModel.collection);
    // example to do the query in one line
    // query.where('object.courseSubject').equals(userInput.courseSubject).exec(function (err, scheduleModel) {
    // building a query with multiple where statements
    // query.where('userID').equals(userInput.userID);
    // query.where('object').equals(userInput.courseSubject);
    query.where('object.courseSubject').equals(userInput.courseSubject);
    // query.where('object.courseCatalog').equals(userInput.courseCatalog);
    // query.where('object.termTitle').equals(userInput.termTitle);
    // query.where('object.termDescription').equals(userInput.termDescription);
    query.exec((err, result) => {
      // console.log("From the sub function: " + query);
      resolve(result);
      reject(err);
    })
  });
}


function findUserProfileFunc(userInput, req, res, next) {
  return new Promise((resolve, reject) => {
    // ============= How to do query ===================================
    // ======== Check if the course Exists =======================
    // const query = scheduleModel.find();
    const query = userProfileModel.findOne();
    query.setOptions({lean: true});
    query.collection(userProfileModel.collection);
    // example to do the query in one line
    // query.where('object.courseSubject').equals(userInput.courseSubject).exec(function (err, scheduleModel) {
    // building a query with multiple where statements
    query.where('userID').equals(userInput.userID);
    // query.where('object.courseCatalog').equals(userInput.courseCatalog);
    // query.where('object.termTitle').equals(userInput.termTitle);
    // query.where('object.termDescription').equals(userInput.termDescription);
    query.exec((err, result) => {
      // console.log("From the sub function: " + query);
      resolve(result);
      reject(err);
    })
  });
}

function isCourseGivenDuringSemesterFunc(userInput, req, res, next) {
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
    // query.where('object.userID').equals(userInput.userID);
    // query.where('object.termTitle').equals(userInput.termTitle);
    query.where('object.termDescription').equals(userInput.termDescription);
    query.exec((err, result) => {
      // console.log("From the sub function: " + query);
      resolve(result);
      reject(err);
    })
  });
}














// ============================ Classes ======================================

class addCourseStatus {

  constructor(isCourseGivenDuringSemesterBool, hasPreReqBool, hasCoReqBool, notTakenBool, alreadyInCartBool) {
    this._isCourseGivenDuringSemesterBool = isCourseGivenDuringSemesterBool;
    this._hasPreReqBool = hasPreReqBool;
    this._hasCoReqBool = hasCoReqBool;
    this._notTakenBool = notTakenBool;
    this._alreadyInCartBool = alreadyInCartBool;

  }

  getIsCourseGivenDuringSemesterBool() {
    return this._isCourseGivenDuringSemesterBool;
  }

  setIsCourseGivenDuringSemesterBool(value) {
    this._isCourseGivenDuringSemesterBool = value;
  }

  getHasPreReqBool() {
    return this._hasPreReqBool;
  }

  setHasPreReqBool(value) {
    this._hasPreReqBool = value;
  }

  getHasCoReqBool() {
    return this._hasCoReqBool;
  }

  setHasCoReqBool(value) {
    this._hasCoReqBool = value;
  }

  getNotTakenBool() {
    return this._notTakenBool;
  }

  setNotTakenBool(value) {
    this._notTakenBool = value;
  }


  getAlreadyInCartBool() {
    return this._alreadyInCartBool;
  }

  setAlreadyInCartBool(value) {
    this._alreadyInCartBool = value;
  }
}
