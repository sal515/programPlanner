const dbHelpers = require("../databaseHandlers/dbHelper");

//imported schema
const userProfileModel = require('../models/userSchema');
const userLoginModel = require('../models/loginSchema');

var username = userLoginModel.get["loginUsername"];
var password = userLoginModel.get["loginPassword"];

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

    let newUserLoginModel = new model({
        username: "claudia",
        password: "123"
    });

    dbHelpers.saveData(newUserLoginModel);

};
