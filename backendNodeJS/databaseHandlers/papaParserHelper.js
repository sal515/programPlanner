const papaParser = require('papaparse');
// const preReqOrCSVfile = require('../../csv/preReqOR.csv');

const fs = require('fs');

var exports = module.exports = {};

// exports.parseCSV = function () {
exports.parseCSV = function (csvFilePath) {
  // The file path should be -->   parser.parseCSV('backendNodeJS/csv/preReqOR.csv');
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

      saveParsedData(results.data, results.errors, results.meta);
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

function saveParsedData(data, error, meta) {
  const dbHelpers = require("./dbHelpers");
  const dataHandlers = require("../dataHandlers/objectGenerators");
  const connectionVar = require("../databaseHandlers/dbConnection");

  // creating a model
  console.log(">>>>>?????<<<<<<");

  const preReqORSchema = dbHelpers.generateModel('pre_req_OR', 'preReqORSchema', connectionVar.connection1);
  console.log(">>>>>?????<<<<<<");

  // creating a new object from the model created above
  const newCourse = dataHandlers.generatePreReqObject(preReqORSchema,data);


  // const newCourse = dataHandlers.generatePreReqObject(preReqORModel,
  //   courseSubject,
  //   courseCatalog,
  //   preReqORWC1,
  //   preReqORsubject1,
  //   preReqORCode1,
  //   preReqORWC2,
  //   preReqORsubject2,
  //   preReqORCode2,
  //   preReqORWC3,
  //   preReqORsubject3,
  //   preReqORCode3,
  //   preReqORWC4,
  //   preReqORsubject4,
  //   preReqORCode4,
  //   preReqORWC5,
  //   preReqORsubject5,
  //   preReqORCode5,
  //   preReqORWC6,
  //   preReqORsubject6,
  //   preReqORCode6);
  // // TODO Cleanup: Printing the new model in the console
  console.log(">>>>>?????<<<<<<");
  console.log(newCourse);
  // saving the object in the database
  // dbHelpers.saveData(newCourse);


  // To check the output or the result of the parse
  // console.log(data);
  // console.log(error);
  // console.log(meta);
}

// TODO: EXAMPLE OF Exporting DATA along with Methods from a File
// exports.parsedData = jsonResult;
