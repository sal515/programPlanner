// This following function shows how to use schema of mixed type and save to database
// import required libraries.
// make a schema using mongoose
// define the attributes of the schema, in this case it is of type mixed
// create a model of the schema
// set the value of the attribute of the model, a connection variable is required
// The foreach loop is used to get the objects in the array and save them separately
// save the model with the data
function makeSchema_SaveExample() {
  const connectionVar = require("./dbConnectionHelper");
  const mongoose = require('mongoose');

  let schema = mongoose.Schema;
  let testSchema = new schema({
    ofMixed: [mongoose.Mixed]
  });

  let newModel = connectionVar.connection1.model('preReqOR', testSchema);

  // data.forEach(function (dataObj) {
  data.forEach(function (dataObj) {

    let amodel = new newModel({
      ofMixed: dataObj
    });

    dbHelpers.saveData(amodel);

  });
}
