// This is an example express app

// importing express package as const app
const express = require('express');

// creating an express app
const app = express();

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
    // This will sent all the appropriate header and other stuff required for the response
    // This is why express is useful, it takes care of shit for me!
    res.send('Hello from Express app');
});


// The following code will allow up to export this express app called "app" to our NodeJS server
module.exports = app;

// The server.js file has to import the app
