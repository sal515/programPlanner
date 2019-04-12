const dbHelpers = require("../databaseHandlers/dbHelper");

//imported schema
const userProfileModel = require('../models/userSchema2Model');

var exports = module.exports = {};

/**
 * Function to remove a course from a user's course cart
 * @param req
 * @param res
 * @param next
 * @returns calls generateSchedule once the process is complete.
 */
exports.removeCourse = async (req, res, next) => {
    await connect2DB();

    const frontEndInput = req.body;
    const userID = frontEndInput.userID;
    const subject = frontEndInput.courseSubject + frontEndInput.courseCatalog;
    const semester = frontEndInput.termDescription;
    const userProfile = await getUserProfile(userID);

    //TODO: Update Schedule

    if (userProfile == null) {
        res.status(200).json({
            message: "no user profile found"
        })
    }

    const semesterCourseCart = getSemesterCourseCart(semester, userProfile.courseCart);
    removeCourse(userProfile, subject, semester);
    updateCourseCart(userProfile, semester, semesterCourseCart);
    await updateUserProfile(userProfile, userProfile.courseCart);

    res.status(200).json({
        message: "hi"
    });
};

/**
 * Returns userProfile
 * @param userID
 * @returns {Query|void}
 */
function getUserProfile(userID) {
    return userProfileModel.findOne({userID: userID});
}

/**
 * Returns the semester from which the class should be deleted
 * @param semester
 * @param courseCart
 * @returns [courses]
 */
function getSemesterCourseCart(semester, courseCart) {
    return courseCart.get(semester);
}

/**
 * removes the desired course from the [courses]
 * if the course is not present, returns false
 * @param userProfile
 * @param subject
 * @param semester
 * @returns {boolean}
 */
function removeCourse(userProfile, subject, semester) {
    delete userProfile.courseCart.get(semester)[subject];
    console.log(userProfile.courseCart);
}

/**
 * Updates the user's course cart for the specified semester with the removed class gone
 * @param userProfile
 * @param semester
 * @param semesterCart
 */
function updateCourseCart(userProfile, semester, semesterCart) {
    userProfile.courseCart.set(semester, semesterCart);
}

function updateUserProfile(userProfile, courseCart) {
    return userProfileModel.findOneAndUpdate({userID: userProfile.userID}, {courseCart: courseCart});
}

/**
 * Tests the logic and general functionality of the remove function
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 * @constructor
 */
exports.TestRemoveCourse = async (req, res, next) => {

    await connect2DB();

    let userID = "1bbbbbbb";
    let userProfile = await getUserProfile(userID);
    let courseCart = getSemesterCourseCart("Fall 2017", userProfile.courseCart);

    removeCourse(courseCart, "SOEN341");
    courseCart = getSemesterCourseCart("Fall 2017", userProfile.courseCart);
    updateCourseCart(userProfile, "Fall 2017", courseCart);
    console.log(userProfile.courseCart);
    await updateUserProfile(userProfile, userProfile.courseCart);

    res.status(200).json({
        message: "ok"
    });
};

async function connect2DB() {
    await dbHelpers.defaultConnectionToDB();
}

exports.removeCourseBack = async (userID, subject, semester) => {
    await connect2DB();

    const userProfile = await getUserProfile(userID);

    const semesterCourseCart = getSemesterCourseCart(semester, userProfile.courseCart);
    removeCourse(userProfile, subject, semester);
    updateCourseCart(userProfile, semester, semesterCourseCart);
    await updateUserProfile(userProfile, userProfile.courseCart);
};
