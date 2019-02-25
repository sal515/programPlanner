// importing mongoose
const mongoose = require('mongoose');

// the exports object can be set to functions that needs to be exposed to other files
var exports = module.exports = {};

// method to connect to multiple databases simultaneously, returns a connection variable, preferred method
exports.connectToDB = function (mongodbHostURL) {
  return mongoose.createConnection(mongodbHostURL, {useNewUrlParser: true});
};


// The following function is used to make a model reference of the schema defined in the model folder
// examples of parameter :
// connectionVar = it is the variable that was obtained from connectToDB() function found above
// schemaName = 'mongodbSchema'   <-- this is the file name of the schema without .js in the models folder
// ModelName = This is the name of the collection in the database found in the mongodB cloud hosted db
exports.createModelOfSchema = function (ModelName, schemaName, connectionVar) {
  let schemaDirectoryPath = '../models/' + schemaName;
  const mongoDBSchema = require(schemaDirectoryPath);
  return connectionVar.model(ModelName, mongoDBSchema);
};

// Warning:: be cautious using the close, because the request was not completed when I tried using close
// exports.closeConnection = function (connectionVar) {
//   connectionVar.close();
// };


exports.saveData = function (newModelObject) {
  newModelObject.save(function (err) {
    if (err) {
      onHandleError(err);
    }
  });
};


exports.onHandleError = function (err) {
  console.log('Error while saving');
};


// the following is the example to make a default connection to the database, can't connect to multiple db simultaneously
// no return connection of variable
exports.defaultConnectionToDB = function (mongodbHostURL) {
  // the following parameters creates the mongoDb url to connect to
  // when the dataBaseName is changed a new database will be created and connected to from the code!
  // const mongoDbHostURL = mongoDbHost + databaseName + mongoDbHostParam + mongoDbHost;

  // connect to database using the url from the website
  mongoose.connect(mongodbHostURL, {useNewUrlParser: true})
    .then(() => {
      console.log('connected to the db');
    })
    .catch(() => {
      console.log('connection failed!');
    });

};
