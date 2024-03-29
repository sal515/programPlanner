// variable holding the references of dbhelper methods
const dbHelpers = require("../databaseHandlers/dbHelper");
var _ = require('lodash');
const remover = require("./removeCourseController");

var exports = module.exports = {};

// WORKAROUND : the directory path are declared separate -- this allows Webstorm to detect the model functions
const modelDirectory = '../models/';
const DbSchemeDirectory = '../models/DbSchemas/';

// importing schema to save data to the default database
const preReqOnlyModel = require(DbSchemeDirectory + 'preReqOnlySchema2Model');
const preReqORModel = require(DbSchemeDirectory + 'preReqORSchema2Model');
const scheduleModel = require(DbSchemeDirectory + 'scheduleSchema2Model');
const notTakenModel = require(DbSchemeDirectory + 'notTakenSchemas2Model');
const userProfileModel = require(modelDirectory + 'userSchema2Model');

/**
 *  This function gets called by the REST END point
 *
 * This is the async controller that lets me call all the functions sequentially
 * This is used to control the async nature of the JS, ->> to be able to write sequential
 * Allows us to avoid "callback hell"  <<-- NOT SOMETHING I CAME UP WITH
 * */
exports.addCourseToSequence = async (req, res, next) => {
    // postman choose: x-www-form-urlencoded  to test data flow from front to backend

    const userInput = req.body;
    // setting the mongoose debugging to true
    // const mongoose = require("mongoose");
    // mongoose.set('debug', true);

    await asyncAddCourseController(userInput, req, res, next);
};

/**
 * Adding sections to course object
 * @param userInput
 * @param lecture
 * @param courseDetails
 * @param tutorial
 * @param lab
 * @returns {Promise<void>}
 */
async function populatingCourseDetailsWithSchedule(userInput, lecture, courseDetails, tutorial, lab) {
    if (userInput.lectureSection !== "none") {
        lecture = await findCourseComponents(
            "LEC",
            userInput.lectureSection,
            userInput.courseSubject,
            userInput.courseCatalog,
            userInput);

        courseDetails["lectureStart"] = lecture.object.classStartTimeMin;
        courseDetails["lectureEnd"] = lecture.object.classEndTimeMin;
        courseDetails["lectureDays"] = daysExtractor(lecture);
    }

    if (userInput.tutorialSection !== "none") {
        tutorial = await findCourseComponents(
            "TUT",
            userInput.tutorialSection,
            userInput.courseSubject,
            userInput.courseCatalog,
            userInput);

        courseDetails["tutorialStart"] = tutorial.object.classStartTimeMin;
        courseDetails["tutorialEnd"] = tutorial.object.classEndTimeMin;
        courseDetails["tutorialDays"] = daysExtractor(tutorial);
    }

    if (userInput.labSection !== "none") {
        lab = await findCourseComponents(
            "LAB",
            userInput.labSection,
            userInput.courseSubject,
            userInput.courseCatalog,
            userInput);

        courseDetails["labStart"] = lab.object.classStartTimeMin;
        courseDetails["labEnd"] = lab.object.classEndTimeMin;
        courseDetails["labDays"] = daysExtractor(lab);

    }
}

/**
 * @return
 * isCourseGivenDuringSemesterBool
 * hasNotTakenBool
 * hasPreReqBool
 * hasCoReqBool
 * notifyCalenderBool
 * */
async function asyncAddCourseController(userInput, req, res, next) {

    /*
    *   Waiting on the connection being established to the database before doing anything
    *   To make sure that there is not connected exception later on in the project
    *   Might degrade some performance (Don't know too much about asynchronous function calls yet) - But hopefully avoid issues
    * */
    await connect2DB();


    // =============================  Logic to add course and Send Responses ===============================================

    let statusObj = new addCourseStatus(true, false, false,
        false, false, false, false);

    let userCourseHistoryArr = [];
    let userCourseHistoryMap = new Map();
    let notTakenCoursesMap = new Map();
    let preReqCoursesArr = [];
    let preReqORCoursesArr = [];
    let courseCartArr = [];
    let userProfile;

    let debug = 10;

    try {

        // checking if the requested course is already in CourseCard
        // if (debug === 0) {
        if (debug >= 0) {
            statusObj.setAlreadyInCartBool(false);

            // assuming the user profile exists, since the user has to login first before accessing this ENDPOINT
            // const userProfile = await findUserProfileDocument(userInput, req, res, next);
            userProfile = await findUserProfileDocument(userInput, req, res, next);

            try {
                if (userProfile.courseCart.has(userInput.termDescription)) {
                    courseCartArr = userProfile.courseCart.get(userInput.termDescription);
                    courseCartArr.forEach((course) => {
                        console.log(course);
                        console.log(userInput.courseSubject + userInput.courseCatalog);
                        if (course === (userInput.courseSubject + userInput.courseCatalog)) {
                            statusObj.setAlreadyInCartBool(true);
                            throw "Breaking the add request";
                        }
                    });
                }
            } catch (err) {
                throw "break: Course is already in course cart or User Profile Not found ";
            }
        }

        // ========== Retrieve user courseHistory from user profile ==========
        // Check => If the array is populated in the function call --> Passed
        // if (debug === 1) {
        if (debug >= 1) {
            await populateUserCourseHistory(userInput, req, res, next, userCourseHistoryArr, userCourseHistoryMap);
            // This case should not apply since user has to login and verify thyself before adding courses
            if (!(userCourseHistoryMap.size || userCourseHistoryArr.length)) {
                throw "break: Profile Not Found";
            }
        }

        // ==========  checking if the course is provided during the semester  ==========
        // if (debug === 2) {
        if (debug >= 2) {
            await checkIfCourseIsProvidedDuringSemester(userInput, req, res, next, statusObj);
            if (!(statusObj.getIsCourseGivenDuringSemesterBool())) {
                throw "break : Course is not given during selected Semester";
            }
        }

        // =============== Retrieve all the Not taken list for the provided list ============
        // if (debug === 3) {
        if (debug >= 3) {
            // Check => If the Map is populated in the function call --> Passed
            await populateNotTakenCourseMap(userInput, req, res, next, notTakenCoursesMap);

            // ============== Checking if the user has taken any course from the Not taken list ===================
            statusObj.setNotTakenBool(true);
            userCourseHistoryArr.forEach((userTakenCourse) => {
                if (notTakenCoursesMap.has(userTakenCourse)) {
                    // If user have a courses in their course history that matches any course in the Not taken List
                    // Setting the notTaken flag to false --> Means taken???
                    // TODO: Does that affect anything????
                    statusObj.setNotTakenBool(false);
                }
                // FIXME : DON"T Know what logic we should be using
                // console.log("User did NOT take a similar course");
            });
        }

        // =============== Retrieve all the pre req-courses for the selected course ============
        // if (debug === 4) {
        if (debug >= 4) {
            await getPreReqArr(userInput, req, res, next, preReqCoursesArr);

            // ============== Checking if the user has all the pre-req for the course ===================
            statusObj.setHasPreReqBool(true);
            if (preReqCoursesArr.length) {
                preReqCoursesArr.forEach((preReqCourseKey) => {
                    if (!(userCourseHistoryMap.has(preReqCourseKey))) {
                        statusObj.setHasPreReqBool(false);
                        throw "break2 : User doesn't have the pre-req to take the course";
                    }
                });
            }
        }

        // =============== Retrieve all the pre req OR  courses for the selected course ============
        // if (debug === 5) {
        if (debug >= 5) {
            await getPreReqOrArr(userInput, req, res, next, preReqORCoursesArr);

            // ============== Checking if the user has all the pre-req OR for the course ===================
            statusObj.setHasPreReqBool(false);
            if (!(preReqORCoursesArr.length)) {
                statusObj.setHasPreReqBool(true);
            } else if (preReqORCoursesArr.length) {
                preReqORCoursesArr.forEach((preReqORCourseKey) => {
                    if ((userCourseHistoryMap.has(preReqORCourseKey))) {
                        statusObj.setHasPreReqBool(true);
                    }
                });
            }
            if (!(statusObj.getHasPreReqBool())) {
                console.log(statusObj);
                throw "break : User doesn't have the pre-req OR to take the course";
            }
        }

        // =================== Saving the course in the courseCart Variable ==============

        // if (debug === -1) {
        if (debug >= 7) {

            statusObj.setNotifyCalenderBool(false);

            // FIXME :: Uncomment the line below
            if (!statusObj.getAlreadyInCartBool() && statusObj.getIsCourseGivenDuringSemesterBool() &&
                statusObj.getHasPreReqBool()) {

                const userProfile = await findUserProfileDocument(userInput, req, res, next);

                let lecture;
                let tutorial;
                let lab;
                let termDetails;
                let courseDetails;
                let courseCode = (userInput.courseSubject + userInput.courseCatalog).toString();

                // if the course cart for the semester exists, get those values
                // typeof myVar !== 'undefined'
                try {
                    if (typeof (userProfile["courseCart"].get(userInput.termDescription)) !== 'undefined') {
                        termDetails = (userProfile["courseCart"].get(userInput.termDescription));

                        // check if the course is already saved in the semester
                        if (typeof userProfile["courseCart"].get(userInput.termDescription)[courseCode] !== 'undefined') {
                            console.log("Course found in the the courseCart");
                            courseDetails = userProfile["courseCart"].get(userInput.termDescription)[courseCode];
                        } else {
                            console.log("Course is not found in the courseCart");
                        }
                    } else {
                        console.log("Didn't find the semester -> Create a new semester");
                    }
                } catch (e) {
                    console.log("Error: Didn't find the semester");
                }

                //update a class that is already in the sequence
                if (typeof courseDetails !== 'undefined') {

                    await populatingCourseDetailsWithSchedule(userInput, lecture, courseDetails, tutorial, lab);
                    await remover.removeCourseBack(userInput.userID, courseCode, userInput.termDescription);

                    termDetails[courseCode] = populateCourseDetails(userInput);
                    userProfile["courseCart"].set(userInput.termDescription, termDetails);
                    statusObj.setNotifyCalenderBool(true);

                    //Create semester key value map object
                } else if (typeof termDetails !== 'undefined') {

                    courseDetails = {};

                    await populatingCourseDetailsWithSchedule(userInput, lecture, courseDetails, tutorial, lab);

                    // insert the course in the term
                    termDetails[courseCode] = populateCourseDetails(userInput);

                    userProfile["courseCart"].set(userInput.termDescription, termDetails);
                    statusObj.setNotifyCalenderBool(true);
                } else {

                    courseDetails = {};
                    //create term if it doesnt exist
                    termDetails = {};

                    await populatingCourseDetailsWithSchedule(userInput, lecture, courseDetails, tutorial, lab);
                    termDetails[courseCode] = populateCourseDetails(userInput);

                    userProfile["courseCart"].set(userInput.termDescription, termDetails);
                    statusObj.setNotifyCalenderBool(true);
                }
                await userProfile.save();
                // FIXME :: Uncomment the line below
            }
        }
    } catch
        (condition) {
        console.log(condition);
    }

    res.status(200).json({
        "status": 200,
        "isCourseGivenDuringSemesterBool": statusObj.getIsCourseGivenDuringSemesterBool(),
        "hasPreReqBool": statusObj.getHasPreReqBool(),
        "notTakenBool": statusObj.getNotTakenBool(),
        "alreadyInCartBool": statusObj.getAlreadyInCartBool(),
        "notifyCalenderBool": statusObj.getNotifyCalenderBool(),
        "conflictOccured": statusObj.getConflictBool(),
        "profile": userProfile

    });

}

// ====================== Data Handling Functions =============================================

async function getPreReqOrArr(userInput, req, res, next, preReqORCoursesArr) {
    const preReqORPromise = await preReqORFunc(userInput, req, res, next).catch((err) => {
        console.log("Error occurred in the database function" + err);
    });
    // FIXME: Kind of cheque is required???
    if (preReqORPromise == null) {
        console.log("No preReqOR list found");
        preReqORCoursesArr = [];
        return;
    }
    let preReqORObjKeysArr = Object.keys(preReqORPromise.object);
    preReqORObjKeysArr.splice(0, 3);
    preReqORObjKeysArr.forEach((key) => {
        if (!(preReqORPromise.object[key] === "")) {
            preReqORCoursesArr.push(preReqORPromise.object[key]);
        }
    });
    // });
}

async function getPreReqArr(userInput, req, res, next, preReqCoursesArr) {
    const preReqPromise = await preReqFunc(userInput, req, res, next).catch((err) => {
        console.log("Error occurred in the database function" + err);
    });
    // FIXME: Kind of cheque is required???
    if (preReqPromise == null) {
        console.log("No preReq list found");
        preReqCoursesArr = [];
        return;
    }
    let preReqObjKeysArr = Object.keys(preReqPromise.object);
    preReqObjKeysArr.splice(0, 3);
    preReqObjKeysArr.forEach((key) => {
        if (!(preReqPromise.object[key] === "")) {
            preReqCoursesArr.push(preReqPromise.object[key]);
        }
    });
    // });
}

async function populateNotTakenCourseMap(userInput, req, res, next, notTakenCoursesMap) {
    const notTakenPromise = await notTakenFunc(userInput, req, res, next).catch((err) => {
        console.log("Error occurred in the database function" + err);
    });
    // FIXME : DIDN'T do a check to check if the Not taken list was found or not -- Must have a throw or some kind of check
    if (notTakenPromise == null) {
        notTakenCoursesMap.clear();
        return;
    } else if (notTakenPromise.length === 0) {
        notTakenCoursesMap.clear();
        return;
    }
    notTakenPromise.forEach((notTakenObj) => {
        let notTakenObjKeysArr = Object.keys(notTakenObj.object);
        notTakenObjKeysArr.splice(0, 3);
        notTakenObjKeysArr.forEach((key) => {
            if (!(notTakenObj.object[key] === "")) {
                notTakenCoursesMap.set(notTakenObj.object[key], "");
            }
        });
    });
}

async function populateUserCourseHistory(userInput, req, res, next, userCourseHistoryArr, userCourseHistoryMap) {
    const userProfilesPromise = await findUserProfileFunc(userInput, req, res, next).catch((error) => {
        console.log("Error occurred in the database function: " + error)
    });

    if (userProfilesPromise == null) {
        userCourseHistoryMap.clear();
        userCourseHistoryArr = null;
        return;
    }
    let semesterKeysArr = Object.keys(userProfilesPromise.courseHistory);
    let tmpCoursesArr = [];
    semesterKeysArr.forEach((semesterKey) => {
            tmpCoursesArr = userProfilesPromise.courseHistory[semesterKey];
            tmpCoursesArr.forEach((course) => {
                userCourseHistoryArr.push(course);
                userCourseHistoryMap.set(course, "");
            });
        }
    );
}


async function checkIfCourseIsProvidedDuringSemester(userInput, req, res, next, statusObj) {
    const foundRandomSectionOfRequestedCoursePromise = await isCourseGivenDuringSemesterFunc(userInput, req, res, next).catch((error) => {
        console.log("Error occurred in the database function: " + error)
    });
    if (foundRandomSectionOfRequestedCoursePromise == null) {
        // console.log("The requested course wasn't found");
        statusObj.setIsCourseGivenDuringSemesterBool(false);
        return;
    }
    statusObj.setIsCourseGivenDuringSemesterBool(true);
    // Test print to see if the course was found or not. -> PASSED
    // console.log(statusObj.getIsCourseGivenDuringSemesterBool());

}

async function connect2DB() {
    await dbHelpers.defaultConnectionToDB();
}


// ====================== Database Query Functions =============================================

function preReqORFunc(userInput, req, res, next) {
    return new Promise((resolve, reject) => {
        // ======== Check if the course Exists =======================
        const query = preReqORModel.findOne();
        query.setOptions({lean: true});
        query.collection(preReqORModel.collection);
        query.where('object.courseSubject').equals(userInput.courseSubject);
        query.where('object.courseCatalog').equals(userInput.courseCatalog);
        query.exec((err, result) => {
            resolve(result);
            reject(err);
        })
    });
}

function preReqFunc(userInput, req, res, next) {
    return new Promise((resolve, reject) => {
        // ======== Check if the course Exists =======================
        const query = preReqOnlyModel.findOne();
        query.setOptions({lean: true});
        query.collection(preReqOnlyModel.collection);
        query.where('object.courseSubject').equals(userInput.courseSubject);
        query.where('object.courseCatalog').equals(userInput.courseCatalog);
        query.exec((err, result) => {
            resolve(result);
            reject(err);
        })
    });
}


function notTakenFunc(userInput, req, res, next) {
    return new Promise((resolve, reject) => {
        // ======== Check if the course Exists =======================
        const query = notTakenModel.find();
        query.setOptions({lean: true});
        query.collection(notTakenModel.collection);
        query.where('object.courseSubject').equals(userInput.courseSubject);
        query.where('object.courseCatalog').equals(userInput.courseCatalog);
        query.exec((err, result) => {
            resolve(result);
            reject(err);
        })
    });
}


function findUserProfileFunc(userInput, req, res, next) {
    return new Promise((resolve, reject) => {
        // ======== Check if the course Exists =======================
        const query = userProfileModel.findOne();
        query.setOptions({lean: true});
        query.collection(userProfileModel.collection);
        query.where('userID').equals(userInput.userID);
        query.exec((err, result) => {
            resolve(result);
            reject(err);
        })
    });
}

function findUserProfileDocument(userInput, req, res, next) {
    return new Promise(async (resolve, reject) => {
        // ======== Check if the course Exists =======================
        let userObject = await userProfileModel.findOne({userID: userInput.userID}, function (err, result) {
            resolve(result);
        });
    });
}

function isCourseGivenDuringSemesterFunc(userInput, req, res, next) {
    return new Promise((resolve, reject) => {
        // ======== Check if the course Exists =======================
        const query = scheduleModel.findOne();
        query.setOptions({lean: true});
        query.collection(scheduleModel.collection);
        query.where('object.courseSubject').equals(userInput.courseSubject);
        query.where('object.courseCatalog').equals(userInput.courseCatalog);
        query.where('object.termDescription').equals(userInput.termDescription);
        query.exec((err, result) => {
            resolve(result);
            reject(err);
        })
    });
}

function populateCourseDetails(userInput) {
    let courseDetails = new Map();
    courseDetails["courseSubject"] = userInput.courseSubject;
    courseDetails["courseCatalog"] = userInput.courseCatalog;
    courseDetails["termDescription"] = userInput.termDescription;
    courseDetails["lectureSection"] = userInput.lectureSection;
    courseDetails["labSection"] = userInput.labSection;
    courseDetails["tutorialSection"] = userInput.tutorialSection;
    return courseDetails;
}


// ======================= Database Query Function =============================
function daysExtractor(section) {
    let daysArr = [];
    // 1-Mon, 2-Tues, 3-Wed, 4-Thursday, 5-Friday
    if (section.object.Mon === "Y") {
        daysArr.push(1);
    }

    if (section.object.Tues === "Y") {
        daysArr.push(2);
    }

    if (section.object.Wed === "Y") {
        daysArr.push(3);
    }

    if (section.object.Thurs === "Y") {
        daysArr.push(4);
    }

    if (section.object.Fri === "Y") {
        daysArr.push(5);
    }
    return daysArr;
}

function findCourseComponents(componentCode, section, courseSubject, courseCatalog, userInput) {
    return new Promise(async (resolve, reject) => {
        // ======== Check if the course Exists =======================
        const query = scheduleModel.findOne();
        query.setOptions({lean: true});
        query.collection(scheduleModel.collection);
        query.where('object.courseSubject').equals(courseSubject);
        query.where('object.courseCatalog').equals(courseCatalog);
        query.where('object.termDescription').equals(userInput.termDescription);
        try {
            if (componentCode === "LEC") {
                query.where('object.componentCode').equals(componentCode);
                query.where('object.section').equals(section);
            } else if (componentCode === "TUT") {
                query.where('object.componentCode').equals(componentCode);
                query.where('object.section').equals(section);
            } else if (componentCode === "LAB") {
                query.where('object.componentCode').equals(componentCode);
                query.where('object.section').equals(section);
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


// ======================== Test Data functions ==========================
async function creatingTestData(userInput, req, res, next) {
    const userProfileDoc = await findUserProfileDocument(userInput, req, res, next);
    // console.log(userProfileDoc);

    let tempCourseCartMap = new Map();
    let fallCourses = ["ENGR371"];
    // let winterCourses = ["COMP346", "ELEC275", "ENGR371", "SOEN331", "SOEN341"];
    tempCourseCartMap.set("Test_Semester1", fallCourses);

    // tempCourseCartMap = null;

    // saving test courses to test preReqOr
    userProfileDoc.courseCart = tempCourseCartMap;
    await userProfileDoc.save();
    // saving test data : Passed
}


// ============================ Classes ======================================

class addCourseStatus {

    constructor(conflict, isCourseGivenDuringSemesterBool, hasPreReqBool, hasCoReqBool, notTakenBool, alreadyInCartBool, notifyCalenderBool) {
        this._isCourseGivenDuringSemesterBool = isCourseGivenDuringSemesterBool;
        this._hasPreReqBool = hasPreReqBool;
        this._notTakenBool = notTakenBool;
        this._alreadyInCartBool = alreadyInCartBool;
        this._notifyCalenderBool = notifyCalenderBool;
        this._conflictBool = conflict;
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

    getNotifyCalenderBool() {
        return this._notifyCalenderBool;
    }

    setNotifyCalenderBool(value) {
        this._notifyCalenderBool = value;
    }

    getConflictBool() {
        return this._conflictBool;
    }

    setConflictBool(value) {
        this._conflictBool = value;
    }
}
