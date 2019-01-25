// const variable so that it can't be mutated late on
// the http package is imported with the require method
const http = require('http');

// importing the expressJS app
const app = require('./backendNodeJS/app');
// setting a constant port for the server
const port = process.env.PORT || 3000;
// setting the constant port to the express app
app.set('port', port);
// creating a http server that will be handled by express app called "app" which is pass in the parameter
const server = http.createServer(app);

server.listen(port);





// THe following code is to setup for pure nodeJS server without express

// the following creates a http server with the variables (request , response)
// const server = http.createServer((req, res)=>{
    // response is used to write to the response, here we are writing a text as the response
    // res.end('This is a test response');
    // res.headersSent();
// })

// the server will be listening at local port 3000 or
// when the production build is generated it will take the port from the hosting provider
// therefore we don't have to change anything in the line during production build
// server.listen(process.env.PORT || 3000);

// console.log('This is the backend NodeJS running!');
