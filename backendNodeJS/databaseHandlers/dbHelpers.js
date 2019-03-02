// // importing mongoose
// const mongoose = require('mongoose');

// the exports object can be set to functions that needs to be exposed to other files
var exports = module.exports = {};

// EXAMPLE: How to connect to dB using createConnection methods can be found in the commented out section
// // method to connect to multiple databases simultaneously, returns a connection variable, preferred method
// exports.connectToDB = function (mongodbHostURL) {
//   return mongoose.createConnection(mongodbHostURL, {useNewUrlParser: true});
// };

// The following function is used to make a model reference of the schema defined in the model folder
exports.generateCourseModel = function (collectionNameInDB, schemaFileNameInModelsDir, connectionVar) {
  let schemaDirectoryPath = '../models/' + schemaFileNameInModelsDir;
  const mongoDBSchema = require(schemaDirectoryPath);
  return connectionVar.model(collectionNameInDB, mongoDBSchema);
};

// Example : code to close connection ( not working as intended )
// Warning:: be cautious using the close, because the request was not completed when I tried using close
// exports.closeConnection = function (connectionVar) {
//   connectionVar.close();
// };

exports.saveData = function (ModelObject) {
  ModelObject.save(function (err) {
    if (err) {
      this.onHandleError(err);
    }
  });
};

// FIXME The fetch all function was not completely tested
exports.findAllDocuments = function (Model) {
  const findAllQuery = Model.find();
  // var findAllQuery = Model.find({id: /a/b}, null );
  return this.findAllDocumentsCallBack(findAllQuery);
};

// FIXME The fetch all function was not completely tested
exports.findAllDocumentsCallBack = function (query) {
  query.exec(function (err, result) {
    if (err) {
      this.onHandleError(err);
    } else {
      return result;
    }
  });
};

exports.onHandleError = function (err) {
  console.log('Error while saving');
};


// // the following is the example to make a default connection to the database, can't connect to multiple db simultaneously
// // no return connection of variable
// exports.defaultConnectionToDB = function (mongodbHostURL) {
//   // the following parameters creates the mongoDb url to connect to
//   // when the dataBaseName is changed a new database will be created and connected to from the code!
//   // const mongoDbHostURL = mongoDbHost + databaseName + mongoDbHostParam + mongoDbHost;
//
//   // connect to database using the url from the website
//   mongoose.connect(mongodbHostURL, {useNewUrlParser: true})
//     .then(() => {
//       console.log('connected to the db');
//     })
//     .catch(() => {
//       console.log('connection failed!');
//     });
// };
