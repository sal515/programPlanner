const dbHelpers = require("../databaseHandlers/dbHelper");

//imported schema
const userProfileModel = require('../models/userSchema');
const userLoginModel = require('../models/loginSchema');



var exports = module.exports = {};

// exports.validateLogin = (req, res, next) => {
//
//     let validUser = userLoginModel.find({username: username,  password: password});
//
//     if(!validUser) {
//         return null;
//     }
//
//     return userProfileModel.find({username: username, password: password});
//
// };

exports.saveUserInfo = (req, res, next) => {

    // connecting to the database using the default connection method
    dbHelpers.defaultConnectionToDB();

    let newUserLoginModel = new userLoginModel({
        username: "claudia",
        password: "123"
    });

    dbHelpers.saveData(newUserLoginModel);

};
