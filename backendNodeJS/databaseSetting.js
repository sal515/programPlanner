// the following parameters creates the mongoDb url to connect to
// when the dataBaseName is changed a new database will be created and connected to from the code!
const databaseName = "ideal_course_sequence";
const mongoDbHost = "mongodb+srv://sal:jacksonlight123@programplanner-khyhz.mongodb.net/";
const mongoDbHostParam = "?retryWrites=true?";
const mongoDbHostURL = mongoDbHost + databaseName + mongoDbHostParam + mongoDbHost;

module.exports = {dbURLString: mongoDbHostURL};
