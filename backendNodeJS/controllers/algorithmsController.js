// variable holding the references of dbhelper methods
const dbHelpers = require("../databaseHandlers/dbHelper");
// variables holding the references of the object creation helper methods
const dataHandlers = require("../dataHandlers/objectGenerator");

// importing schema to save data to the default database
const coReqOnlyModel = require('../models/DbSchemas/coReqOnlySchema2Model');
const notTakenModel = require('../models/DbSchemas/notTakenSchemas2Model');
const preReqOnlyModel = require('../models/DbSchemas/preReqOnlySchema2Model');
const preReqORModel = require('../models/DbSchemas/preReqORSchema2Model');
const scheduleModel = require('../models/DbSchemas/scheduleSchema2Model');

// importing the user profiles
const userProfileModel = require('../models/userSchema2Model');


/**
 * Find the user
 *
 *
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */

exports.addCourseToSequence = (req, res, next) => {
  // user input should have the following:
  //  - userID
  //  - Semester selected
  //  - Course Subject
  //  - Course Code
  const userInput = req.body;
  // Example or Test statement from postman --> in the body ->> x-www-form-urlencoded was selected
  // let testTitle = userInput.COEN;

  // setting the mongoose debugging to true
  const mongoose = require("mongoose");
  mongoose.set('debug', true);

  dbHelpers.defaultConnectionToDB();

  // both findOne() and find() works
  // const query = scheduleModel.find();
  const query = scheduleModel.findOne();
  query.setOptions({lean: true});
  query.collection(scheduleModel.collection);
  // example to do the query in one line
  // query.where('object.courseSubject').equals(userInput.courseSubject).exec(function (err, scheduleModel) {
  // building a query with multiple where statements
  query.where('object.courseSubject').equals(userInput.courseSubject);
  query.where('object.courseCatalog').equals(userInput.courseCatalog);
  query.exec(function (err, scheduleModel) {
    try {
      // if (scheduleModel == null) {
      //   return null;
      // } else {
        res.status(200).json({
          userInput,
          scheduleModel,
          // testTitle,
          message: "addCourseToSequence executed"
        })
      // }
    } catch (err) {
      console.log("Error finding the course provided by the user");
      res.status(500).json({
        message: "Internal Server Error: Course not found"
      })
    }
  });
};

