// variable holding the connection to the database
const connectionVar = require("../databaseHandlers/dbConnection");
// variable holding the references of dbhelper methods
const dbHelpers = require("../databaseHandlers/dbHelpers");
// variables holding the references of the object creation helper methods
const dataHandlers = require("../dataHandlers/objectGenerators")
// import parserHelper file
const parser = require("../databaseHandlers/papaParserHelper");


// TODO: FIX ROUTE - Doesn't make sense now since test is done
exports.saveCourse = (req, res, next) => {

    const dataReceived = req.body;

  // TODO CLEANUP: DELETE TEST FUNCTION
  testDataReceived(dataReceived);

  // -------------- To Save to DB ------------------------------------------------
  // creating a model of courseSchema
  const CourseModel = dbHelpers.generateModel('courseCollection', 'courseSchema', connectionVar.connection1);
  // creating a new object from the model created above
  const newCourse = dataHandlers.generateCourseObject(CourseModel, dataReceived.courseSubject, dataReceived.courseCatalog, dataReceived.courseTitle, dataReceived.courseCredits);
  // TODO Cleanup: Printing the new model in the console
  console.log(newCourse);
  // saving the object in the database
  dbHelpers.saveData(newCourse);
  // -------------- To Save to DB ------------------------------------------------

  res.status(201).json({
    // code 201 represents that the request was successful and data was received
    // code 201 represents that the request was successful and data was received
    message: 'Course added successfully'
  });
};

// TODO CLEANUP: DELETE TEST FUNCTION
function testDataReceived(courseFromFrontEnd) {
  console.log(courseFromFrontEnd.courseSubject);
  console.log(parseInt(courseFromFrontEnd.courseCatalog, 10));
  console.log(courseFromFrontEnd.courseTitle);
  console.log(courseFromFrontEnd.courseCredits);
// console.log( typeof courseFromFrontEnd.title);
// console.log(Number(courseFromFrontEnd.code));
// console.log( typeof courseFromFrontEnd.code);
}

// TODO: FIX ROUTE - Doesn't make sense now since test is done
exports.retrieveCourse = (req, res, next) => {
  res.status(200).json({
    message: "Course fetched successfully",
    title: "SOEN",
    code: "341"
  });
};

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

  parser.parseCSVAndSaveToDB('backendNodeJS/csv/schedule.csv', 'schedule', 'scheduleSchema');

}

function generateNotTakenList (req, res, next) {

  parser.parseCSVAndSaveToDB('backendNodeJS/csv/nt.csv', 'notTaken', 'notTakenSchemas');

}

function generateCoReqOnlyList (req, res, next) {

  parser.parseCSVAndSaveToDB('backendNodeJS/csv/coReqOnly.csv', 'coReqOnly', "coReqOnlySchema");

}

function generatePreReqOnlyList (req, res, next) {

  parser.parseCSVAndSaveToDB('backendNodeJS/csv/preReqOnly.csv', "preReqOnly", "preReqOnlySchema");

}

function generatePreReqORList (req, res, next) {

  parser.parseCSVAndSaveToDB('backendNodeJS/csv/preReqOR.csv', "preReqOr", "preReqORSchema");

}

//
// exports.saveCourse = (req, res, next) => {
//   // The data received from front-end is accessed by req.body
//   const courseFromFrontEnd = req.body;
//
//   // creating a model of courseSchema
//   const CourseModel = dbHelpers.generateModel('courseModel', 'courseSchema', conn1);
//   // creating a new object from the model created above
//   const newCourse = new CourseModel({
//     subject: courseFromFrontEnd.subject,
//     catalog: courseFromFrontEnd.catalog
//   });
//   console.log(newCourse);
// // saving the object in the database
//   dbHelpers.saveData(newCourse);
//
//   res.status(201).json({
//     // code 201 represents that the request was successful and data was received
//     // code 201 represents that the request was successful and data was received
//     message: 'Course added successfully'
//   });
// };
//
//
// exports.retrieveCourse = (req, res, next) => {
//   const CourseModel = dbHelpers.generateModel('courseModel', 'courseSchema', conn1);
//   // FIXME The fetch all function was not completely tested
//   var courses = dbHelpers.findAllDocuments(CourseModel);
//   res.status(200).json({
//     message: "Course fetched successfully",
//     courses: courses
//   });
// };
