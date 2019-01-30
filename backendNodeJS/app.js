// This is an example express app

//---------------------------------------------------------------------
// Code to make this file an express app
//---------------------------------------------------------------------

// importing express package as const app
const mongoose = require('mongoose');

const express = require('express');

// creating an express app
const app = express();

// ====================================================================


//---------------------------------------------------------------------
// Connect to db
//---------------------------------------------------------------------

// importing dbHelpers.js file that contains custom db helper functions
const dbHelpers = require('./databaseHandlers/dbHelpers');
// import db url variable
const dbURL = require('./databaseSetting');
// connect to db
// dbHelpers.connectToDB(dbURL.dbURLString);

// ====================================================================


//---------------------------------------------------------------------
// Importing schema
//---------------------------------------------------------------------

// importing the mongodb model
const Mongodb = require('./models/mongodbSchema');


var conn1 = mongoose.createConnection(dbURL.dbURL1String);
var exSchema1 = conn1.model('exShema', Mongodb);

var conn2 = mongoose.createConnection(dbURL.dbURL2String);
var exSchema2 = conn2.model('exShema', Mongodb);

// const mongooseSchema = mongoose.Schema({
//   name: String
//   // title: {type: String, required: true},
//   // content: {type: String, required: true}
// });






// ====================================================================


//---------------------------------------------------------------------
// Express functions / Middleware functions
//---------------------------------------------------------------------

// middleware function which handles the http requests
app.use((req, res, next)=>{
  console.log('First Middleware Called');
  // the next allows the request to be continued after this function
  // if the next() is commented out and a response is not sent from this method
  // A timeout err will occur due to no response from server, this shows how next() works
  // Might be required somewhere

//---------------------------------------------------------------------
// Creating an object from the Schema and saving it to the db
//---------------------------------------------------------------------

  console.log('Before ');

  const saveSchema1 = new exSchema1({
    name: 'hello'
  });
  saveSchema1.save();
  // conn1.close();

  // saveSchema.save();
  const saveSchema2 = new exSchema2({
    name: ''
  });

  saveSchema2.save();

  // // new db object
  // const mongodb1 = new Mongodb({
  //   name: 'hello'
  // });
  // console.log(mongodb1);
  // mongodb1.save();



  console.log('after');


// ====================================================================


  next();
});


// middleware function which handles the http requests
app.use((req, res, next)=>{

  // NOT wrking save???

  // This will sent all the appropriate header and other stuff required for the response
  // This is why express is useful, it takes care of shit for me!
  res.send('Hello from Express app with nodemon installed');
});

// ====================================================================


//---------------------------------------------------------------------
// Exporting the express app to the server.js file
//---------------------------------------------------------------------

// The following code will allow up to export this express app called "app" to our NodeJS server
module.exports = app;

// The server.js file has to import the app
// ====================================================================
