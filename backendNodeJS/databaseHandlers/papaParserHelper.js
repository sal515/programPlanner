const dbHelpers = require("../databaseHandlers/dbHelper");
//  papa parser used to parse the CSV to JSON
const papaParser = require('papaparse');

// fs is used to read the CSV file as a stream to the papa parser
const fs = require('fs');

var exports = module.exports = {};

exports.parseCSVAndSaveToDB = function (csvFilePath, model) {
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
    encoding: "UTF-8",
    worker: false,
    // comments: false,
    // step: function (row) {
    // jsonResult.push(row.data);
    // },
    complete: function (results) {
      saveParsedData(results.data, results.errors, results.meta, model);
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

function saveParsedData(data, error, meta, model) {

  // Extracting every object from the data array and creating an object according to the model from the schema file in the model directory
  data.forEach(function (dataObject) {
    let newPreReqModel = new model({
      object: dataObject
    });
    // save model to database
    dbHelpers.saveData(newPreReqModel);
  });
}
