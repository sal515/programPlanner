const dbHelpers = require("../databaseHandlers/dbHelper");

//imported schema
const userProfileModel = require('../models/userSchema');
const userLoginModel = require('../models/loginSchema');


var exports = module.exports = {};

/**
 * To verify correct credentials
 * returns null if the credentials are incorrect
 * otherwise, returns the user's profile
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.validateLogin = (req, res, next) => {

    dbHelpers.defaultConnectionToDB();

    // const loginCredentials = req.body;
    const loginCredentials = userLoginModel;
    loginCredentials.loginUsername = "popo";
    loginCredentials.loginPassword = "123";

    let validUser = userLoginModel.find({
        loginUsername: loginCredentials.loginUsername,
        loginPassword: loginCredentials.loginPassword
    });

    console.log(validUser);

    if (!validUser) {
        return null;
    }

    let newUserProfileModel = userProfileModel.find({
        userID: loginCredentials.loginUsername,
        userPassword: loginCredentials.loginPassword
    });

    res.status(200).json({
        newUserProfileModel,
        message: "valid Credentials"
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
