const dbHelpers = require("../databaseHandlers/dbHelper");
const mongoose = require('mongoose');

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
exports.removeCourse = (req, res, next) => {

    // connecting to the database using the default connection method
    connect2DB();

    const frontEndInput = req.query;
    const userID = frontEndInput.userID;
    const subject = frontEndInput.courseSubject + frontEndInput.courseCatalog;
    const semester = frontEndInput.termDescription;
    const userProfile = getUserProfile(userID);
    const courseCart = getSemesterCourseCart(semester, userProfile);

    const success = removeCourse(courseCart, subject);

    if (success) {
        updateCourseCart(userProfile, semester, courseCart);

        //TODO: call generate sequence
    } else {
        res.status(200).json({
            message: "Unable to remove course"
        })
    }
    mongoose.disconnect();
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
 * @param userProfile
 * @returns [courses]
 */
function getSemesterCourseCart(semester, userProfile) {
    return userProfile.get(semester);
}

/**
 * removes the desired course from the [courses]
 * if the course is not present, returns false
 * @param courseCart
 * @param subject
 * @returns {boolean}
 */
function removeCourse(courseCart, subject) {
    const index = courseCart.indexOf(subject);
    if (index > -1) {
        courseCart.splice(index, 1);
        return true;
    }
    return false;
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

exports.TestRemoveCourse = async (req, res, next) => {

    // connecting to the database using the default connection method
    await connect2DB();

    let userID = "1bbbbbbb";
    let userProfile = await getUserProfile(userID);
    console.log(userProfile);
    res.status(200).json({
        message: "ok"
    });

    // const courseCart = getSemesterCourseCart(semester, userProfile);
    //
    // const success = removeCourse(courseCart, subject);
    // updateCourseCart(userProfile, semester, courseCart);

};

async function connect2DB() {
// connect to database
    await dbHelpers.defaultConnectionToDB();
}
