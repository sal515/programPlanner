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
//
// // FIXME The fetch all function was not completely tested
// exports.findAllDocuments = function (Model) {
//   const findAllQuery = Model.find();
//   // var findAllQuery = Model.find({id: /a/b}, null );
//   return this.findAllDocumentsCallBack(findAllQuery);
// };
//
// // FIXME The fetch all function was not completely tested
// exports.findAllDocumentsCallBack = function (query) {
//   query.exec(function (err, result) {
//     if (err) {
//       this.onHandleError(err);
//     } else {
//       return result;
//     }
//   });
// };

exports.onHandleError = function (err) {
  console.log('Error while saving');
};
