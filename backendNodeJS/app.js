// This is an example express app

// importing express package as const app
const express = require('express');

// creating an express app
const app = express();

// importing mongoose
const mongoose = require('mongoose');
// connect to database using the url from the website
mongoose.connect("mongodb+srv://sal:jacksonlight123@programplanner-khyhz.mongodb.net/programPlannerCheck?retryWrites=true?", {useNewUrlParser: true})
    .then(()=>{
        console.log('connected to the db');
    })
    .catch(() =>{
    console.log('connection failed!');
});
// importing the mongodb model
const Mongodb = require('./mongodbSchema');

// middleware function which handles the http requests
app.use((req, res, next)=>{
    console.log('First Middleware Called')
    // the next allows the request to be continued after this function
    // if the next() is commented out and a response is not sent from this method
    // A timeout err will occur due to no response from server, this shows how next() works
    // Might be required somewhere
    next();
});


// middleware function which handles the http requests
app.use((req, res, next)=>{
    // new db object
    const mongodb1 = new Mongodb({
      title: 'hello',
      content: 'Hi'
    });


    // NOT wrking save???



    // This will sent all the appropriate header and other stuff required for the response
    // This is why express is useful, it takes care of shit for me!
    res.send('Hello from Express app with nodemon installed');
});


// The following code will allow up to export this express app called "app" to our NodeJS server
module.exports = app;

// The server.js file has to import the app

