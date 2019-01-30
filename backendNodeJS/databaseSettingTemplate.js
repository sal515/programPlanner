// the following parameters creates the mongoDb url to connect to
// when the dataBaseName is changed a new database will be created and connected to from the code!
const mongoDbHost = "mongodb+srv://sal:jacksonlight123@programplanner-khyhz.mongodb.net/";
const mongoDbHostParam = "?retryWrites=true?";

// database 1
// const databaseName1 = "Your_DB1_Name_Here";
// const mongoDbHostURL1 = mongoDbHost + databaseName1 + mongoDbHostParam + mongoDbHost;

// database 2 (if required)
// const databaseName2 = "Your_DB2_Name_Here";
// const mongoDbHostURL2 = mongoDbHost + databaseName2 + mongoDbHostParam + mongoDbHost;

// export below exposes this url string to other files that imports the file using "const dbURL = require('./databaseSetting');"

// Uncomment the following line if you have multiple database declared above
// module.exports = {databaseName1: mongoDbHostURL1, databaseName2: mongoDbHostURL2};

// Uncomment the following line if you have a single database declared above
// module.exports = {databaseName1: mongoDbHostURL1};
