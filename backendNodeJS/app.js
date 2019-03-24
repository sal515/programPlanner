// ---------------------------------------------------------------------
// Basic Imports to create a functional ExpressJS app
// ---------------------------------------------------------------------
// importing express package as const app
const express = require('express');
// creating an express app
const app = express();
// import body-parser MiddleWare
const bodyParser = require("body-parser");
// importing corsHelper file
const corsHelper = require('./server/corsHelper');
// ====================================================================

// ---------------------------------------------------------------------
// Importing the routing file to execute the required functions
// ---------------------------------------------------------------------
// importing routes files from the routes directory for simplification of this files
const genDataRoute = require('./routes/generateDataRoute');
const validateLoginRoute = require('./routes/validateLoginRoute');
const algorithmRoute = require('./routes/algorithmsRoute');
// ====================================================================

// ---------------------------------------------------------------------
//  Express middleware functions used to parse the incoming request's body
// ---------------------------------------------------------------------
// parsing json body in the request
app.use(bodyParser.json());
// parsing urlencoded bodies in the request
app.use(bodyParser.urlencoded({extended: false}));
// ====================================================================

// ---------------------------------------------------------------------
// Setting the CORS Headers - To enable communication between the frontEnd and BackEnd
// ---------------------------------------------------------------------
// This function is required for our Decoupled Application -- Don't Remove it to keep the back and front connected
app.use((req, res, next) => {
  // Handling CORS for our Decoupled FrontEnd and BackEnd
  // This is done by setting the proper Headers for the response (please see corsHelpers.js file in server directory)
  corsHelper.setCorsHeaders(res, req, next);
  next();
});
// ====================================================================


// ---------------------------------------------------------------------
// ExpressJS middleware used to forward HTTP request to their proper router files
// ---------------------------------------------------------------------
// Forwarding the initial requests from the user to generate their ideal Schedule
app.use("/api/generateData", genDataRoute);
app.use("/validateLogin", validateLoginRoute);
app.use("/algorithms", algorithmRoute );

// middleware handling http request that has no specific routing path by sending error message as response
app.use((req, res, next) => {
  // TODO Cleanup: Remove console log, when test is done
  // console.log('ERROR: Requested REST API Endpoint was not found');
  // console.log('Default Request Handler Executed');
  res.send('ERROR: Requested REST API Endpoint was not found - Default Request Handler Executed');
});
// ====================================================================

// ---------------------------------------------------------------------
// Exporting the express app to the server.js file
// ---------------------------------------------------------------------
// The following code will allow up to export this express app called "app" to our NodeJS server
module.exports = app;
// NOTE :: The server.js file has to import this app called  "app" found in the backendNodeJS
// ====================================================================




