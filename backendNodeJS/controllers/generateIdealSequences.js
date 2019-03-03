// variable holding the connection to the database
const connectionVar = require("../databaseHandlers/dbConnection");
// variable holding the references of dbhelper methods
const dbHelpers = require("../databaseHandlers/dbHelpers");
// variables holding the references of the object creation helper methods
const dataHandlers = require("../dataHandlers/objectGenerators")
// import parserHelper file
const parser = require("../databaseHandlers/papaParserHelper");

exports.saveCourse = (req, res, next) => {

    const dataReceived = req.body;

  // TODO CLEANUP: DELETE TEST FUNCTION
  testDataReceived(dataReceived);

  // creating a model of courseSchema
  const CourseModel = dbHelpers.generateModel('courseCollection', 'courseSchema', connectionVar.connection1);
  // creating a new object from the model created above
  const newCourse = dataHandlers.generateCourseObject(CourseModel, dataReceived.courseSubject, dataReceived.courseCatalog, dataReceived.courseTitle, dataReceived.courseCredits);
  // TODO Cleanup: Printing the new model in the console
  console.log(newCourse);
  // saving the object in the database
  dbHelpers.saveData(newCourse);

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

// TODO CLEANUP: DELETE TEST FUNCTION
function testParsing() {
  // let parsedData = [];
  parser.parseCSV('backendNodeJS/csv/preReqOR.csv');
  // console.log(parser.parsedData());
  // console.log(parser.parsedData);

  // console.log(parser.parsedData('backendNodeJS/csv/preReqOR.csv'));


}

exports.retrieveCourse = (req, res, next) => {

  //TODO CLEANUP : Test parsing function
  testParsing();

  res.status(200).json({
    message: "Course fetched successfully",
    title: "SOEN",
    code: "341"
  });
};

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
