// This is an example express app
// ---------------------------------------------------------------------
// Code to make this file an express app
// ---------------------------------------------------------------------
// importing express package as const app
// const mongoose = require('mongoose');

const express = require('express');

// creating an express app
const app = express();
// ====================================================================

// importing corsHelper file
const corsHelper = require('./server/corsHelper');

// This function is required for our Decoupled Applicaiton -- Don't Remove it to keep the back and front connected
app.use((req, res, next) => {
  // Handling CORS for our Decoupled FrontEnd and BackEnd
  // This is done by setting the proper Headers for the response (please see corsHelpers.js file in server directory)
  corsHelper.setCorsHeaders(res, req, next);
  next();
});


// ---------------------------------------------------------------------
// Imports required to connect to db and
// Call database connecting wrapper from dbHelper.js
// -------------------------------------- -------------------------------
// importing dbHelpers.js file that contains custom db helper functions
const dbHelpers = require('./databaseHandlers/dbHelpers');
// import db url variable
const dbURL = require('./databaseSetting');

// calling the custom wrapper to connect to db (not the default connection method)
const conn1 = dbHelpers.connectToDB(dbURL.databaseName1);

// ====================================================================


// ---------------------------------------------------------------------
// Importing schema or making a model (not sure about the proper references yet, will get there!)
// ---------------------------------------------------------------------
// importing and creating a model from a schema
const schemaModel1 = dbHelpers.createModelOfSchema('schemaName', 'mongodbSchema', conn1);

// ====================================================================


// ---------------------------------------------------------------------
// Express functions / Middleware functions
// ---------------------------------------------------------------------
// express/middleware function such as the following handles the http requests
app.use('/save', function (req, res, next) {
  console.log('Routed: callSave');
  // the next allows the request to be continued after this function
  // if the next() is commented out and a response is not sent from this method
  // A timeout err will occur due to no response from server, this shows how next() works
  // Might be required somewhere

// ---------------------------------------------------------------------
// Creating an object from the Schema and saving it to the db
// ---------------------------------------------------------------------

  console.log('Before ');

  const saveSchema1 = new schemaModel1({
    name: 'hello'
  });

  dbHelpers.saveData(saveSchema1);

  console.log('after');

// ====================================================================

  next();
});


// middleware function which handles the REST API call from frontEnd at the filtered path
app.use('/api/courses', function (req, res, next) {
  const courses = [
    {
      id: '10001',
      courseType: 'SOEN',
      courseCode: 341
    },
    {
      id: '1002',
      courseType: 'COEN',
      courseCode: 346
    },
    {
      id: '10003',
      courseType: 'COEN',
      courseCode: 390
    },
    {
      id: '10004',
      courseType: 'ELEC',
      courseCode: 353
    }
  ];
  // sending simple object which will be converted to json
  // res.json(courses);
  // sending more complex object with message and properties
  res.status(200).json({
    message: 'Course Fetched Successfully',
    courses: courses
  });

});

// middleware function which handles the http requests
app.use((req, res, next) => {
  console.log('Default HTTP Request Handler');
  // This will sent all the appropriate header and other stuff required for the response
  // This is why express is useful, it takes care of shit for me!
  res.send('Default Express HTTP handler was called with nodemon installed');
});

// ====================================================================


// ---------------------------------------------------------------------
// Exporting the express app to the server.js file
// ---------------------------------------------------------------------
// The following code will allow up to export this express app called "app" to our NodeJS server
module.exports = app;
// NOTE :: The server.js file has to import this app called  "app" found in the backendNodeJS
// ====================================================================




