// importing mongoose
const mongoose = require('mongoose');

// the exports object can be set to functions that needs to be exposed to other files
var exports = module.exports = {};


exports.connectToDB = function (databaseName, mongoDbHost, mongoDbHostParam) {

  // the following parameters creates the mongoDb url to connect to
  // when the dataBaseName is changed a new database will be created and connected to from the code!
  const mongoDbHostURL = mongoDbHost + databaseName + mongoDbHostParam + mongoDbHost;

  // connect to database using the url from the website
  mongoose.connect(mongoDbHostURL, {useNewUrlParser: true})
    .then(() => {
      console.log('connected to the db');
    })
    .catch(() => {
      console.log('connection failed!');
    });

};
