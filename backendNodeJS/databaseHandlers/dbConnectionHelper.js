// importing mongoose
const mongoose = require('mongoose');
// importing settings file
const dbSettings = require('../databaseSetting');

// the exports object can be set to functions that needs to be exposed to other files
// var exports = module.exports = {};

const connectionOptions = {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
  // autoIndex: false, // Don't build indexes
  // reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  // reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 1 // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  // bufferMaxEntries: 0,
  // connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  // socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  // family: 4 // Use IPv4, skip trying IPv6
};

// method to connect to multiple databases simultaneously, returns a connection variable, preferred method
function setConnectionVar(mongodbHostURL, options) {
  return mongoose.createConnection(mongodbHostURL, options);
}

let connectionVar = setConnectionVar(dbSettings.databaseName1, connectionOptions);

module.exports = {connection1: connectionVar};


