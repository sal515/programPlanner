const dbHelpers = require("../databaseHandlers/dbHelper");

//imported schema
const userProfileModel = require('../models/userSchema2Model');
const userLoginModel = require('../models/loginSchema2Model');

var exports = module.exports = {};

/**
 * To verify correct credentials
 * returns null if the credentials are incorrect
 * otherwise, returns the user's profile
 * @param req
 * @param res
 * @param next
 * @returns {userProfileModel}
 */
exports.validateLogin = (req, res, next) => {

    dbHelpers.defaultConnectionToDB();

    const loginCredentials = req.body;
    // const loginCredentials = userProfileModel;
    // loginCredentials.userID = "popo";
    // loginCredentials.userPassword = "123";

    let user = userProfileModel.findOne({
        userID: loginCredentials.userID,
        userPassword: loginCredentials.userPassword
    });

    user.exec(function (er, userProfileModel) {
        try {
            if (userProfileModel.userID) {
                console.log("Successfully fetched user information");
                return userProfileModel;
            }
        } catch (er) {
            console.log("Invalid Credentials");
            return null;
        }
    });

    res.status(200).json({
        message: "information processed successfully"
    })
};

/**
 * for testing purposes
 */
// exports.saveUserInfo = (req, res, next) => {
//
//     // connecting to the database using the default connection method
//     dbHelpers.defaultConnectionToDB();
//
//     let newUserLoginModel = new userLoginModel({
//         loginUsername: "claudia",
//         loginPassword: "123"
//     });
//
//     dbHelpers.saveData(newUserLoginModel);
//
//     res.status(200).json({
//         message: "user added"
//     });
//
// };

/**
 * for testing purposes
 */
// exports.saveUserInfo = (req, res, next) => {
//
//     // connecting to the database using the default connection method
//     dbHelpers.defaultConnectionToDB();
//
//     var courseHistory = ["SOEN 341", "COMP 346", "ENGR 213"];
//
//     let newUserProfileModel = new userProfileModel({
//
//         userID: "claudia",
//         userPassword: "123",
//         coop: true,
//         courseHistory: courseHistory,
//         completedCredits: 20
//     });
//
//     dbHelpers.saveData(newUserProfileModel);
//
//     res.status(200).json({
//         message: "user added"
//     });
// };
