const dbHelpers = require("../databaseHandlers/dbHelper");
var exports = module.exports = {};

const modelDirectory = '../models/';
const DbSchemeDirectory = '../models/DbSchemas/';
const scheduleModel = require(DbSchemeDirectory + 'scheduleSchema2Model');
const coReqOnlyModel = require(DbSchemeDirectory + 'coReqOnlySchema2Model');

// importing the user profiles
const userProfileModel = require(modelDirectory + 'userSchema2Model');


exports.populateCourseCartCourses = async (req, res, next) => {

  const userInput = req.body;

  await connect2DB();

  // console.log(userInput.userID);
  // console.log(userInput.termDescription);

  // let tempMap = new Map();
  let courseCartArr = [];
  let tempMapStringify;

  let userProfile = await findUserCourseCart(userInput);
  // console.log(userProfile);

  userProfile.get("courseCart");
  // console.log(userProfile.get("courseCart"));

  courseCartArr =  userProfile.get('courseCart').get(userInput.termDescription);
  // console.log(courseCartArr);
  // courseCartArr.forEach((course) => {
  //   console.log(course);
  // });

  res.status(200).json({
    "coursesCartArr": courseCartArr
  });
};


function findUserCourseCart(userInput) {
  return new Promise(async (resolve, reject) => {
      let userObject = await userProfileModel.findOne({userID: userInput.userID}, function (err, result) {
        resolve(result);
      })
    }
  );
}


exports.populateSidebar = async (req, res, next) => {
  await connect2DB();

  let tempMap = new Map();
  let tempMapStringify;

  let coursesArrayofMaps = [];

  // console.log();
  // console.log(allCourses);
  // console.log(allCourses.length);
  // console.log(allCourses[0].object.courseSubject);
  let tempCoursesArrofMaps = await findAllCourses();
  tempCoursesArrofMaps.forEach((courseObject) => {
    try {
      if ((courseObject.object.courseSubject === "" || courseObject.object.courseCatalog === "" ||
        courseObject.object.termDescription === "")) {
        throw "Invalid";
      }

      tempMap.set("courseSubject", courseObject.object.courseSubject);
      tempMap.set("courseCatalog", courseObject.object.courseCatalog);
      tempMap.set("termDescription", courseObject.object.termDescription);
      tempMapStringify = dbHelpers.map2Json(tempMap);
      coursesArrayofMaps.push(tempMapStringify);

    } catch (err) {
      console.log("Invalid");
    }
    // console.log(tempMap);
  });
  // console.log(coursesArrayofMaps.length);

  console.log(coursesArrayofMaps);


  res.status(200).json({
    "coursesArrayOfMaps": coursesArrayofMaps
  });
};


function findAllCourses() {
  return new Promise((resolve, reject) => {
      const query = coReqOnlyModel.find();
      query.setOptions({lean: true});
      query.collection(scheduleModel.collection);
      query.where('object');
      query.exec((err, result) => {
        resolve(result);
        reject(err);
      })
    }
  );
}


async function connect2DB() {
// connect to database
  await dbHelpers.defaultConnectionToDB();
}
