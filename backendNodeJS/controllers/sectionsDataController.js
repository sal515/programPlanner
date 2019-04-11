const dbHelpers = require("../databaseHandlers/dbHelper");
var exports = module.exports = {};

const modelDirectory = '../models/';
const DbSchemeDirectory = '../models/DbSchemas/';
const scheduleModel = require(DbSchemeDirectory + 'scheduleSchema2Model');

// importing the user profiles
const userProfileModel = require(modelDirectory + 'userSchema2Model');

//
// exports.sendAllSections = async (req, res, next) => {
//
//   await connect2DB();
//
//   // let mongooseDebug = true;
//   let mongooseDebug = false;
//   if (mongooseDebug) {
//     const mongoose = require("mongoose");
//     mongoose.set('debug', true);
//   }
//
//   const userInput = req.body;
//   if (userInput.userID === "" ||
//     userInput.courseSubject === "" ||
//     userInput.courseCatalog === "" ||
//     userInput.termDescription === "") {
//
//     res.status(200).json({
//       "message": "No Input for some of the variables sent"
//     });
//     return;
//   }
//
//   let lecSections = [];
//   let lecSections2SendArr = [];
//   let lecSections2SendMap = new Map();
//   let tutSections = [];
//   let tutSections2SendArr = [];
//   let tutSections2SendMap = new Map();
//   let labSections = [];
//   let labSections2SendArr = [];
//   let labSections2SendMap = new Map();
//
//   lecSections = await findCourseComponents("LEC", userInput.courseSubject,
//     userInput.courseCatalog, userInput);
//
//   tutSections = await findCourseComponents("TUT", userInput.courseSubject,
//     userInput.courseCatalog, userInput);
//
//   labSections = await findCourseComponents("LAB", userInput.courseSubject,
//     userInput.courseCatalog, userInput);
//
//   // console.log(lecSections);
//
//   for (const lecSection of lecSections) {
//     lecSections2SendArr.push(lecSection.object.section);
//     lecSections2SendMap.set((lecSection.object.section).toString(), "");
//   }
//
//   for (const tutSection of tutSections) {
//     tutSections2SendArr.push(tutSection.object.section);
//     tutSections2SendMap.set((tutSection.object.section).toString(), "");
//   }
//
//   for (const labSection of labSections) {
//     labSections2SendArr.push(labSection.object.section);
//     labSections2SendMap.set((labSection.object.section).toString(), "");
//   }
//
//   res.status(200).json({
//     "message": "ok",
//     lectureSection: [dbHelpers.map2Json(lecSections2SendMap)],
//     tutorialSection: [dbHelpers.map2Json(tutSections2SendMap)],
//     labSection: [dbHelpers.map2Json(labSections2SendMap)]
//
//     // lectureSection: dbHelpers.map2Json(lecSections2SendMap)  ,
//     // tutorialSection: dbHelpers.map2Json(tutSections2SendMap),
//     // labSection: dbHelpers.map2Json(labSections2SendMap)
//
//     // lectureSection: lecSections2SendArr,
//     // tutorialSection: tutSections2SendArr,
//     // labSection: labSections2SendArr
//   });
// };
//

exports.sendAllTutLabSections = async (req, res, next) => {

  await connect2DB();


  // let mongooseDebug = true;
  let mongooseDebug = false;
  if (mongooseDebug) {
    const mongoose = require("mongoose");
    mongoose.set('debug', true);
  }

  const userInput = req.body;
  if (userInput.userID === "" ||
    userInput.courseSubject === "" ||
    userInput.courseCatalog === "" ||
    userInput.termDescription === "") {

    res.status(200).json({
      "message": "No Input for some of the variables sent"
    });
    return;
  }

  let tutSections = [];
  let tutSections2SendArr = [];
  let tutSections2SendMap = new Map();

  let labSections = [];
  let labSections2SendArr = [];
  let labSections2SendMap = new Map();

  tutSections = await findCourseComponents("TUT", userInput.courseSubject,
    userInput.courseCatalog, userInput);

  labSections = await findCourseComponents("LAB", userInput.courseSubject,
    userInput.courseCatalog, userInput);

  for (const tutSection of tutSections) {
    tutSections2SendArr.push(tutSection.object.section);
    tutSections2SendMap.set((tutSection.object.section).toString(), "");
  }

  for (const labSection of labSections) {
    labSections2SendArr.push(labSection.object.section);
    labSections2SendMap.set((labSection.object.section).toString(), "");
  }

  res.status(200).json({
    "message": "ok",
    tutorialSection: [dbHelpers.map2Json(tutSections2SendMap)],
    labSection: [dbHelpers.map2Json(labSections2SendMap)]

    // tutorialSection: dbHelpers.map2Json(tutSections2SendMap),
    // labSection: dbHelpers.map2Json(labSections2SendMap)

    // lectureSection: lecSections2SendArr,
    // tutorialSection: tutSections2SendArr,
    // labSection: labSections2SendArr
  });
};


exports.sendAllLectures = async (req, res, next) => {

  await connect2DB();

  // let mongooseDebug = true;
  let mongooseDebug = false;
  if (mongooseDebug) {
    const mongoose = require("mongoose");
    mongoose.set('debug', true);
  }

  const userInput = req.body;
  if (userInput.userID === "" ||
    userInput.courseSubject === "" ||
    userInput.courseCatalog === "" ||
    userInput.termDescription === "") {

    res.status(200).json({
      "message": "No Input for some of the variables sent"
    });
    return;
  }

  let lecSections = [];
  let lecSections2SendArr = [];
  let lecSections2SendMap = new Map();

  lecSections = await findCourseComponents("LEC", userInput.courseSubject,
    userInput.courseCatalog, userInput);

  for (const lecSection of lecSections) {
    lecSections2SendArr.push(lecSection.object.section);
    lecSections2SendMap.set((lecSection.object.section).toString(), "");
  }

  res.status(200).json({
    "message": "ok",
    lectureSection: [dbHelpers.map2Json(lecSections2SendMap)],
    // lectureSection: dbHelpers.map2Json(lecSections2SendMap)  ,
    // lectureSection: lecSections2SendArr,
  });
};

// =============== helper functions ==========================
async function connect2DB() {
// connect to database
  await dbHelpers.defaultConnectionToDB();
}


// ======================= Database Query Function =============================
function findCourseComponents(componentCode, courseSubject, courseCatalog, userInput) {
  return new Promise(async (resolve, reject) => {
    const query = scheduleModel.find();
    query.setOptions({lean: true});
    query.collection(scheduleModel.collection);
    query.where('object.courseSubject').equals(courseSubject);
    query.where('object.courseCatalog').equals(courseCatalog);
    query.where('object.termDescription').equals(userInput.termDescription);
    try {
      if (componentCode === "LEC") {
        query.where('object.componentCode').equals("LEC");
      } else if (componentCode === "TUT") {
        query.where('object.componentCode').equals("TUT");
      } else if (componentCode === "LAB") {
        query.where('object.componentCode').equals("LAB");
      } else {
        throw "Component Code is not properly selected";
      }
      await query.exec((err, result) => {
        resolve(result);
        reject(err);
      });
    } catch (e) {
      console.log(e);
    }
  });
}


// ================= CLass Combination declarations ============================
class combination {

  constructor(
    lec,
    tut,
    lab) {

    this.lec = lec;
    this.tut = tut;
    this.lab = lab;
  }

  // getters and setters for the course schedule objects
  getLec() {
    return this.lec;
  }

  setLec(value) {
    this.lec = value;
  }

  getTut() {
    return this.tut;
  }

  setTut(value) {
    this.tut = value;
  }

  getLab() {
    return this.lab;
  }

  setLab(value) {
    this.lab = value;
  }
}


class courseSchedule {

  constructor(
    courseSubject,
    courseCatalog,
    componentCode,
    section,
    termDescription,
    classStartTimeMin,
    classDuration,
    classEndTimeMin,
    Mon,
    Tues,
    Wed,
    Thurs,
    Fri) {

    this.courseSubject = courseSubject;
    this.courseCatalog = courseCatalog;
    this.componentCode = componentCode;
    this.section = section;
    this.termDescription = termDescription;
    this.classStartTimeMin = classStartTimeMin;
    this.classDuration = classDuration;
    this.classEndTimeMin = classEndTimeMin;
    this.Mon = Mon;
    this.Tues = Tues;
    this.Wed = Wed;
    this.Thurs = Thurs;
    this.Fri = Fri;
  }

  // getters and setters for the course schedule objects


  getCourseSubject() {
    return this.courseSubject;
  }

  setCourseSubject(value) {
    this.courseSubject = value;
  }

  getCourseCatalog() {
    return this.courseCatalog;
  }

  setCourseCatalog(value) {
    this.courseCatalog = value;
  }

  getComponentCode() {
    return this.componentCode;
  }

  setComponentCode(value) {
    this.componentCode = value;
  }

  getSection() {
    return this.section;
  }

  setSection(value) {
    this.section = value;
  }

  getTermDescription() {
    return this.termDescription;
  }

  setTermDescription(value) {
    this.termDescription = value;
  }

  getClassStartTimeMin() {
    return this.classStartTimeMin;
  }

  setClassStartTimeMin(value) {
    this.classStartTimeMin = value;
  }

  getClassDuration() {
    return this.classDuration;
  }

  setClassDuration(value) {
    this.classDuration = value;
  }

  getClassEndTimeMin() {
    return this.classEndTimeMin;
  }

  setClassEndTimeMin(value) {
    this.classEndTimeMin = value;
  }

  getMon() {
    return this.Mon;
  }

  setMon(value) {
    this.Mon = value;
  }

  getTues() {
    return this.Tues;
  }

  setTues(value) {
    this.Tues = value;
  }

  getWed() {
    return this.Wed;
  }

  setWed(value) {
    this.Wed = value;
  }

  getThurs() {
    return this.Thurs;
  }

  setThurs(value) {
    this.Thurs = value;
  }

  getFri() {
    return this.Fri;
  }

  setFri(value) {
    this.Fri = value;
  }
}


// ============================== Helper functions =============================
function mapToJson(map) {
  return JSON.stringify([...map]);
}

function jsonToMap(jsonStr) {
  return new Map(JSON.parse(jsonStr));
}
