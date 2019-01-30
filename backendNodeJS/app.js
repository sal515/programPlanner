// This is an example express app
//---------------------------------------------------------------------
// Code to make this file an express app
//---------------------------------------------------------------------
// importing express package as const app
// const mongoose = require('mongoose');
const express = require('express');

// creating an express app
const app = express();
// ====================================================================


//---------------------------------------------------------------------
// Imports required to connect to db and
// Call database connecting wrapper from dbHelper.js
//-------------------------------------- -------------------------------
// importing dbHelpers.js file that contains custom db helper functions
const dbHelpers = require('./databaseHandlers/dbHelpers');
// import db url variable
const dbURL = require('./databaseSetting');

// calling the custom wrapper to connect to db (not the default connection method)
var conn1 = dbHelpers.connectToDB(dbURL.databaseName1);

// ====================================================================


//---------------------------------------------------------------------
// Importing schema or making a model (not sure about the proper references yet, will get there!)
//---------------------------------------------------------------------
// importing and creating a model from a schema
var schemaModel1 = dbHelpers.createModelOfSchema('schemaName', 'mongodbSchema', conn1);

// ====================================================================


//---------------------------------------------------------------------
// Express functions / Middleware functions
//---------------------------------------------------------------------
// express/middleware function such as the following handles the http requests
app.use('/callSave',function(req, res, next){
  console.log('Routed: callSave');
  // the next allows the request to be continued after this function
  // if the next() is commented out and a response is not sent from this method
  // A timeout err will occur due to no response from server, this shows how next() works
  // Might be required somewhere

//---------------------------------------------------------------------
// Creating an object from the Schema and saving it to the db
//---------------------------------------------------------------------

  console.log('Before ');

  const saveSchema1 = new schemaModel1({
    name: 'hello'
  });

  dbHelpers.saveData(saveSchema1);

  console.log('after');

// ====================================================================

  next();
});


// middleware function which handles the http requests
app.use('/callGenerateTest', function(req, res, next){
  console.log('Routed : callGenerateTest');
  // This will sent all the appropriate header and other stuff required for the response
  // This is why express is useful, it takes care of shit for me!
  res.send('Hello from Express app with nodemon installed');
});

// middleware function which handles the http requests
app.use((req, res, next) =>{
  console.log('Default HTTP Request Handler');
  // This will sent all the appropriate header and other stuff required for the response
  // This is why express is useful, it takes care of shit for me!
  res.send('Default Express HTTP handler was called with nodemon installed');
});

// ====================================================================


//---------------------------------------------------------------------
// Exporting the express app to the server.js file
//---------------------------------------------------------------------
// The following code will allow up to export this express app called "app" to our NodeJS server
module.exports = app;
// NOTE :: The server.js file has to import this app called  "app" found in the backendNodeJS
// ====================================================================




