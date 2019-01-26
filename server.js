// const variable so that it can't be mutated late on
// the http package is imported with the require method
const http = require('http');

// importing the expressJS app
const app = require('./backendNodeJS/app');

// needed for nodemon
const debug = require("debug")("node-angular");



// checks the port for integer when received from the hosting provider
const normalizePort = val => {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
};

// Error handling function to check what kind of error occurred
const onError = error => {
    if (error.syscall !== "listen") {
        throw error;
    }
    const bind = typeof port === "string" ? "pipe " + port : "port " + port;
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const onListening = () => {
    const addr = server.address();
    const bind = typeof port === "string" ? "pipe " + port : "port " + port;
    debug("Listening on " + bind);
};

// setting a constant port for the server
const port = normalizePort(process.env.PORT || 3000);

// setting the constant port to the express app
app.set('port', port);

// creating a http server that will be handled by express app called "app" which is pass in the parameter
const server = http.createServer(app);

//Error warning listeners
server.on("error", onError);
server.on("listening", onListening);

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
