// // importing mongoose
const mongoose = require('mongoose');
const dbSettings = require('../databaseSetting');

// the exports object can be set to functions that needs to be exposed to other files
var exports = module.exports = {};

// Connection to a single database when the program is running, using the default connection method of mongoose
exports.defaultConnectionToDB = function () {
  return mongoose.connect(dbSettings.databaseURL, {useNewUrlParser: true})
  .then(() => {
    console.log('connected to the db');
  })
  .catch(() => {
    console.log('connection failed!');
  });
};

exports.saveData = function (ModelObject) {
  ModelObject.save(function (err) {
    if (err) {
      this.onHandleError(err);
    }
  });
};


exports.onHandleError = function (err) {
  console.log('Error while saving');
};


// ============================== Helper functions =============================
exports.map2Json = function mapToJson(map) {
  return JSON.stringify([...map]);
};

exports.Json2map = function jsonToMap(jsonStr) {
  return new Map(JSON.parse(jsonStr));
};
