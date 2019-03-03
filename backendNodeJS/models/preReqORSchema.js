const mongoose = require('mongoose');
const preReqORSchema = mongoose.Schema({
  arr: {type : [Schema.Types.Mixed]}

  // courseSubject: {type: String, required: true},
  // courseCatalog: {type: String, required: true},
  //
  // preReqORWC1: {type: String, required: true},
  // preReqORsubject1: {type: String, required: true},
  // preReqORCode1: {type: String, required: true},
  // preReqORWC2: {type: String, required: true},
  // preReqORsubject2: {type: String, required: true},
  // preReqORCode2: {type: String, required: true},
  // preReqORWC3: {type: String, required: true},
  // preReqORsubject3: {type: String, required: true},
  // preReqORCode3: {type: String, required: true},
  // preReqORWC4: {type: String, required: true},
  // preReqORsubject4: {type: String, required: true},
  // preReqORCode4: {type: String, required: true},
  // preReqORWC5: {type: String, required: true},
  // preReqORsubject5: {type: String, required: true},
  // preReqORCode5: {type: String, required: true},
  // preReqORWC6: {type: String, required: true},
  // preReqORsubject6: {type: String, required: true},
  // preReqORCode6: {type: String, required: true}
});

module.exports = preReqORSchema;
