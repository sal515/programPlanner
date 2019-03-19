// importind database helper file
const dbHelper = require("../databaseHandlers/dbHelper");

// importing 'jsonFile' module to easily read the json file
const jsonFileManager = require('jsonfile');

// import parserHelper file
const parser = require("../databaseHandlers/papaParserHelper");

//importing the loDash library for easier object manipulation
// var lodash = require('lodash');
var _ = require('lodash');

// importing json File with student test data
const studentDataFile = 'backendNodeJS/json/hardCodedUsers/studentsJSON.json';

// importing user model from the model directory
const userProfileModel = require('../models/userSchema2Model');

// importing schema to save data to the default database
const coReqOnlyModel = require('../models/DbSchemas/coReqOnlySchema2Model');
const notTakenModel = require('../models/DbSchemas/notTakenSchemas2Model');
const preReqOnlyModel = require('../models/DbSchemas/preReqOnlySchema2Model');
const preReqORModel = require('../models/DbSchemas/preReqORSchema2Model');
const scheduleModel = require('../models/DbSchemas/scheduleSchema2Model');

exports.genTestStudents = (req, res, next) => {
  jsonFileManager.readFile(studentDataFile, function (err, obj) {
    try {
      // create connection to database
      dbHelper.defaultConnectionToDB();

      let globalYearKey;

      //iterating the root students objects
      _.forIn(obj.students, function (yearVal, yearKey) {
        globalYearKey = yearKey;

        //iterating students through the year
        _.forIn(yearVal, function (studentVal, studentKey) {
          // console.log(globalYearKey);
          // console.log(studentVal.userID);

          let userProfile = new userProfileModel({
            // userID should be 8 characters
            userID: studentVal.userID,
            // userPass is case sensitive
            userPassword: studentVal.userPassword,
            // sequence should tell user when they started and if coop. Example: Fall start year 2 SOEN
            coop: studentVal.coop,
            // course should include catalog number and subject for now: ELEC 311
            // courseHistory: {tags: [{type: String}]},
            courseHistory: studentVal.courseHistory,
            // courseCredits example: 33.5   --> Note: In JS float are also referred as of type "Number"
            completedCredits: studentVal.completedCredits,
            // saved sequences with the classNumbers of each lecture, tutorial, and lab
            fallSequence: studentVal.fallSequence,
            winterSequence: studentVal.winterSequence,
            summerSequence: studentVal.summerSequence
          });

          dbHelper.saveData(userProfile);
        });
      });

      // example of accessing the JSON file values
      // console.log(_.get(obj, 'students.Year1[0]'));

      res.status(200).json({
        message: "Test students were generated successfully"
        // obj

      })

    } catch (err) {
      console.log("Error Reading the JSON File with Student Data");
      res.status(500).json({
        message: "Internal Server Error: JSON File not Found"
      })
    }

  });
};


exports.generateCoursesSchedules = (req, res, next) => {

  generateCoReqOnlyList(req, res, next);
  generateNotTakenList(req, res, next);
  generatePreReqOnlyList(req, res, next);
  generatePreReqORList(req, res, next);
  generateScheduleList(req, res, next);

  res.status(200).json({
    message: "Courses inserted successfully"
  })

};

function generateScheduleList(req, res, next) {

  parser.parseCSVAndSaveToDB('backendNodeJS/csv/schedule.csv', scheduleModel);

}

function generateNotTakenList(req, res, next) {

  parser.parseCSVAndSaveToDB('backendNodeJS/csv/nt.csv', notTakenModel);

}

function generateCoReqOnlyList(req, res, next) {

  parser.parseCSVAndSaveToDB('backendNodeJS/csv/coReqOnly.csv', coReqOnlyModel);

}

function generatePreReqOnlyList(req, res, next) {

  parser.parseCSVAndSaveToDB('backendNodeJS/csv/preReqOnly.csv', preReqOnlyModel);

}

function generatePreReqORList(req, res, next) {

  parser.parseCSVAndSaveToDB('backendNodeJS/csv/preReqOR.csv', preReqORModel);

}


