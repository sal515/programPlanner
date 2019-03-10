//  papa parser used to parse the CSV to JSON
const papaParser = require('papaparse');

// fs is used to read the CSV file as a stream to the papa parser
const fs = require('fs');

var exports = module.exports = {};

// exports.parseCSVAndSaveToDB = function () {
exports.parseCSVAndSaveToDB = function (csvFilePath, collectionName, modelName) {
  // The file path should be -->   parser.parseCSVAndSaveToDB('backendNodeJS/csv/preReqOR.csv');
  let file = fs.createReadStream(csvFilePath);
  papaParser.parse(file, {
    // The commented out object members are all available options for parsing, please don't delete
    delimiter: "",	// auto-detect
    newline: "",	// auto-detect
    // quoteChar: '"',
    // escapeChar: '"',
    header: true,
    // transformHeader: undefined,
    // dynamicTyping: false,
    // preview: 0,
    // encoding: "",
    worker: false,
    // comments: false,
    // step: function (row) {
    // jsonResult.push(row.data);
    // },
    complete: function (results) {
      // TODO Cleanup : Console log when test is done
      // console.log('parsing complete read', count, 'records.');
      // console.log(results);
      // parsedData = results;
      // jsonResult = results;
      // saveParsedData(results);
      // console.log(results.data[0]);
      // this.parsedData(results.data);
      // jsonResult = results.data;

      // console.log(results.data.entries());
      // Number of columns in the Parsed Json file
      // console.log(results.data.length);

      saveParsedData(results.data, results.errors, results.meta, collectionName, modelName);
    },
    // error: undefined,
    // download: false,
    skipEmptyLines: true
    // chunk: undefined,
    // fastMode: undefined,
    // beforeFirstChunk: undefined,
    // withCredentials: undefined,
    // transform: undefined
    // delimitersToGuess: [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP]
    // The commented out object members are all available options for parsing, please don't delete

  });
};

function saveParsedData(data, error, meta, collectionName, modelName) {
  const dbHelpers = require("./dbHelpers");
  const dataHandlers = require("../dataHandlers/objectGenerators");
  const connectionVar = require("../databaseHandlers/dbConnection");

  // creating a model of courseSchema
  const preReqORModel = dbHelpers.generateModelDbSchema(collectionName, modelName, connectionVar.connection1);

  // Extracting every object from the data array and saving it to the database
  data.forEach(function (dataObj) {
    let newPreReqORModel = dataHandlers.generatePreReqObject(preReqORModel, dataObj);
    dbHelpers.saveData(newPreReqORModel);
  });

  // To check the output or the result of the parse
  // console.log(data);
  // console.log(error);
  // console.log(meta);
}

// TODO: EXAMPLE OF Exporting DATA along with Methods from a File
// exports.parsedData = jsonResult;
