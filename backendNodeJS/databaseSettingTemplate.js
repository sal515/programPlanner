// the following parameters creates the mongoDb url to connect to
// when the dataBaseName is changed a new database will be created and connected to from the code!
const mongoDbHost = "mongodb+srv://sal:jacksonlight123@programplanner-khyhz.mongodb.net/";
const mongoDbHostParam = "?retryWrites=true?";

const databaseName = "ideal_course_sequence";
const mongoDbHostURL1 = mongoDbHost + databaseName + mongoDbHostParam + mongoDbHost;

const databaseName2 = "ideal_course_another";
const mongoDbHostURL2 = mongoDbHost + databaseName2 + mongoDbHostParam + mongoDbHost;

module.exports = {dbURL1String: mongoDbHostURL1, dbURL2String: mongoDbHostURL2};
