//imported schema
const userProfileModel = require('../models/userSchema2Model');

var exports = module.exports = {};

/**
 * To verify correct credentials
 * returns null if the credentials are incorrect
 * otherwise, returns the user's profile
 * @param req
 * @param res
 * @param next
 * @returns HTTP response 200 with {userProfileModel} or null
 */
exports.validateLogin = (req, res, next) => {

  //take login credentials from request parameters
  const loginCredentials = req.query;
  console.log(loginCredentials);

  //fetching the DB to find the userProfile
  let user = userProfileModel.findOne({
    userID: loginCredentials.userID,
    userPassword: loginCredentials.userPassword
  });

  //if userProfile is found the userProfile is sent to the front-end as a json object
  //else, null is sent instead with Http response status is always 200 (Success)
  user.exec(function (er, userProfileModel) {
    try {
      if (userProfileModel.userID) {
        console.log("Successfully fetched user information");
        res.status(200).json({
          studentProfile: userProfileModel
        })
      }
    } catch (er) {
      console.log("Invalid Credentials");
      res.status(200).json({
        studentProfile: null
      })
    }
  });
};

/**
 * To create a user in the DB for testing purposes
 * username: test
 * password: 123
 * @param req
 * @param res
 * @param next
 * @returns HTTP response 200 (Success)
 */
exports.saveUserInfo = (req, res, next) => {

  // creating fake courseHistory
  var courseHistory = ["SOEN 341", "COMP 346", "ENGR 213"];

  // creating fake userProfile
  let newUserProfileModel = new userProfileModel({

    userID: "test",
    userPassword: "123",
    coop: true,
    courseHistory: courseHistory,
    completedCredits: 20
  });

  // saves the userProfile in the DB
  dbHelpers.saveData(newUserProfileModel);

  // sending back HTTP response 200
  res.status(200).json({
    message: "user added"
  });
};
