// import parserHelper file
const parser = require("../databaseHandlers/papaParserHelper");

// importing schema to save data to the default database
const coReqOnlyModel = require('../models/DbSchemas/coReqOnlySchema2Model');
const notTakenModel = require('../models/DbSchemas/notTakenSchemas2Model');
const preReqOnlyModel = require('../models/DbSchemas/preReqOnlySchema2Model');
const preReqORModel = require('../models/DbSchemas/preReqORSchema2Model');
const scheduleModel = require('../models/DbSchemas/scheduleSchema2Model');

exports.populateDatabase = (req, res, next) => {

  generateCoReqOnlyList(req, res, next);
  generateNotTakenList(req, res, next);
  generatePreReqOnlyList(req, res, next);
  generatePreReqORList(req, res, next);
  generateScheduleList(req, res, next);

  res.status(200).json({
    message: "Courses inserted successfully"
  })

};

function generateScheduleList (req, res, next) {

  parser.parseCSVAndSaveToDB('backendNodeJS/csv/schedule.csv', scheduleModel);

}

function generateNotTakenList (req, res, next) {

  parser.parseCSVAndSaveToDB('backendNodeJS/csv/nt.csv', notTakenModel);

}

function generateCoReqOnlyList (req, res, next) {

  parser.parseCSVAndSaveToDB('backendNodeJS/csv/coReqOnly.csv', coReqOnlyModel);

}

function generatePreReqOnlyList (req, res, next) {

  parser.parseCSVAndSaveToDB('backendNodeJS/csv/preReqOnly.csv', preReqOnlyModel);

}

function generatePreReqORList (req, res, next) {

  parser.parseCSVAndSaveToDB('backendNodeJS/csv/preReqOR.csv', preReqORModel);

}



// Refactored the Back-end: From Multiple DB Connection --> Single DB Connection
//
// Refactored all the back-end files, so that the default single mongoose connection is used , rather than the function to connect to multiple databases simultaneously.
