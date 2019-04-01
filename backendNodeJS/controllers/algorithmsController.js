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
const coReqOnlyModel = require(DbSchemeDirectory + 'coReqOnlySchema2Model');
const preReqOnlyModel = require(DbSchemeDirectory + 'preReqOnlySchema2Model');
const preReqORModel = require(DbSchemeDirectory + 'preReqORSchema2Model');

const scheduleModel = require(DbSchemeDirectory + 'scheduleSchema2Model');
const notTakenModel = require(DbSchemeDirectory + 'notTakenSchemas2Model');

// importing the user profiles
const userProfileModel = require(modelDirectory + 'userSchema2Model');


async function connect2DB() {
// connect to database
  await dbHelpers.defaultConnectionToDB();
}


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

  console.log("Print First");


  asyncFuncController(userInput, req, res, next);

};


/*
* This is the async controller that lets me call all the functions sequentially
* This is used to controller the async nature of the JS, ->> to be able to write sequential
* Allows us to avoid "callback hell"  <<-- NOT SOMETHING I CAME UP WITH
* */
async function asyncFuncController(userInput, req, res, next) {
  await asyncAddCourseController(userInput, req, res, next);

  console.log("Print Last");
}


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
async function asyncAddCourseController(userInput, req, res, next) {

  /*
  *   Waiting on the connection being established to the database before doing anything
  *   To make sure that there is not connected exception later on in the project
  *   Might degrade some performance (Don't know too much about asynchronous function calls yet) - But hopefully avoid issues
  * */
  await connect2DB();

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
  let allCoursesTakenByUserMap = new Map();
  let notTakenCoursesToCheckMap = new Map();
  // let preReqCoursesToCheckMap = new Map();
  let preReqCoursesToCheckArr = [];

  try {

    // ========== Retrieve user courseHistory from user profile ==========
    // Check => If the array is populated in the function call --> Passed
    // console.log(allCoursesTakenByUserArr);
    await getAllCoursesTakenByUser(userInput, req, res, next, allCoursesTakenByUserArr, allCoursesTakenByUserMap);
    // console.log(allCoursesTakenByUserArr);

    // ==========  checking if the course is provided during the semester  ==========
    let debug = false;
    // console.log(statusObj);
    if (debug) {
      await checkIfCourseIsProvidedDuringSemester(userInput, req, res, next, statusObj);
    }
    // console.log(statusObj);

    // =============== Retrieve all the Not taken list for the provided list ============
    // let courseSubCat2Check = userInput.courseSubject + userInput.courseCatalog;
    // Check => If the Map is populated in the function call --> Passed
    // console.log(notTakenCoursesToCheckMap);
    await getNotTakeCourseMap(userInput, req, res, next, notTakenCoursesToCheckMap);
    // console.log(notTakenCoursesToCheckMap);

    // ============== Checking if the user has taken any course from the Not taken list ===================
    allCoursesTakenByUserArr.forEach((userTakenCourse) => {
      if (notTakenCoursesToCheckMap.has(userTakenCourse)) {
        // FIXME : DON"T Know what logic we should be using
        statusObj.setNotTakenBool(false);
        console.log("User took a similar course");
      }
      // FIXME : DON"T Know what logic we should be using
      statusObj.setNotTakenBool(true);
      // console.log("User did NOT take a similar course");
    });
    // console.log(notTakenCoursesToCheckMap);
    // console.log(notTakenKeys);
    // console.log(notTakenPromise.length);


    // =============== Retrieve all the pre req-courses for the selected course ============
    await getPreReqArr(userInput, req, res, next, preReqCoursesToCheckArr);
    // console.log(preReqCoursesToCheckArr);
    // console.log(allCoursesTakenByUserMap);


    // ============== Checking if the user has all the pre-req for the course ===================
    statusObj.setHasPreReqBool(true);
    preReqCoursesToCheckArr.forEach((preReqCourseKey) => {
      if (!(allCoursesTakenByUserMap.has(preReqCourseKey))) {
        statusObj.setHasPreReqBool(false);
        throw "break2 : User doesn't have the pre-req to take the course";
      }
    });

    // console.log("User Has pre-req");
    // console.log(statusObj);







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


// ====================== Logic Functions =============================================


async function getPreReqArr(userInput, req, res, next, preReqCoursesToCheckArr) {
  const preReqPromise = await preReqFunc(userInput, req, res, next).catch((err) => {
    console.log("Error occurred in the database function" + err);
  });
  // console.log(preReqPromise);
  // preReqPromise.forEach((notTakenObj) => {
  // FIXME: Kind of cheque is required???
  if (preReqPromise == null) {
    console.log("No preReq list found");
    preReqCoursesToCheckArr = null;
    return;
  }
  let preReqObjKeysArr = Object.keys(preReqPromise.object);
  preReqObjKeysArr.splice(0, 3);
  // console.log(notTakenObj);
  // console.log(preReqObjKeysArr);
  preReqObjKeysArr.forEach((key) => {
    if (!(preReqPromise.object[key] === "")) {
      // console.log(notTakenObj.object[key]);
      // preReqCoursesToCheckArr.set(preReqPromise.object[key], "");
      preReqCoursesToCheckArr.push(preReqPromise.object[key]);
    }
  });
  // });
}

async function getNotTakeCourseMap(userInput, req, res, next, notTakenCoursesToCheckMap) {
  const notTakenPromise = await notTakenFunc(userInput, req, res, next).catch((err) => {
    console.log("Error occurred in the database function" + err);
  });
  // FIXME : DIDN'T do a check to check if the Not taken list was found or not -- Must have a throw or some kind of check
  if (notTakenPromise == null) {
    console.log("Not taken list was not found");
    notTakenCoursesToCheckMap = null;
    return;
  }
  // let tempNotTakenObj;
  // let notTakenKeys = Object.keys(notTakenPromise[0].object);
  notTakenPromise.forEach((notTakenObj) => {
    let notTakenObjKeysArr = Object.keys(notTakenObj.object);
    notTakenObjKeysArr.splice(0, 3);
    // console.log(notTakenObj);
    // console.log(notTakenObjKeysArr);
    notTakenObjKeysArr.forEach((key) => {
      if (!(notTakenObj.object[key] === "")) {
        // console.log(notTakenObj.object[key]);
        notTakenCoursesToCheckMap.set(notTakenObj.object[key], "");
      }
    });
  });
}


async function getAllCoursesTakenByUser(userInput, req, res, next, allCoursesTakenByUserArr, allCoursesTakenByUserMap) {
  const userProfilesPromise = await findUserProfileFunc(userInput, req, res, next).catch((error) => {
    console.log("Error occurred in the database function: " + error)
  });
  // console.log(typeof userProfilesPromise);
  if (userProfilesPromise == null) {
    allCoursesTakenByUserMap = null;
    allCoursesTakenByUserArr = null;
    throw "break: Profile Not Found";
  }
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
        allCoursesTakenByUserMap.set(course, "");
      });
    }
  );
  // statusObj.setAlreadyInCartBool(false);
}


async function checkIfCourseIsProvidedDuringSemester(userInput, req, res, next, statusObj) {
  const foundRandomSectionOfRequestedCoursePromise = await isCourseGivenDuringSemesterFunc(userInput, req, res, next).catch((error) => {
    console.log("Error occurred in the database function: " + error)
  });
  if (foundRandomSectionOfRequestedCoursePromise == null) {
    console.log("The requested course wasn't found");
    statusObj.setIsCourseGivenDuringSemesterBool(false);
    throw "break : Course is not given during selected Semester";
  }
  statusObj.setIsCourseGivenDuringSemesterBool(true);
  // Test print to see if the course was found or not. -> PASSED
  // console.log(statusObj.getIsCourseGivenDuringSemesterBool());

  // testing if the passed status object is being modified from inside the function
  // Test Passed
  // statusObj.setIsCourseGivenDuringSemesterBool(true);
  // statusObj.setAlreadyInCartBool(true);
  // statusObj.setNotTakenBool(true);
  // statusObj.setHasPreReqBool(true);
  // statusObj.setHasCoReqBool(true);

}


// ====================== Database Query Functions =============================================

function preReqFunc(userInput, req, res, next) {
  return new Promise((resolve, reject) => {
    // ============= How to do query ===================================
    // ======== Check if the course Exists =======================
    const query = scheduleModel.findOne();
    // const query = preReqOnlyModel.find();
    query.setOptions({lean: true});
    query.collection(preReqOnlyModel.collection);
    // example to do the query in one line
    // query.where('object.courseSubject').equals(userInput.courseSubject).exec(function (err, scheduleModel) {
    // building a query with multiple where statements
    // query.where('userID').equals(userInput.userID);
    // query.where('object').equals(userInput.courseSubject);
    query.where('object.courseSubject').equals(userInput.courseSubject);
    query.where('object.courseCatalog').equals(userInput.courseCatalog);
    // query.where('object.termTitle').equals(userInput.termTitle);
    // query.where('object.termDescription').equals(userInput.termDescription);
    query.exec((err, result) => {
      // console.log("From the sub function: " + query);
      resolve(result);
      reject(err);
    })
  });
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
    query.where('object.courseCatalog').equals(userInput.courseCatalog);
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
