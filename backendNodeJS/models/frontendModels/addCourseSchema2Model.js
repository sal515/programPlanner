const mongoose = require('mongoose');
const addCourseSchema2Model = mongoose.Schema({

  userID: {type: String, required: true},
  // courseSubject example: COEN
  courseSubject: {type: String, required: true},
  // courseCatalog example: 311
  courseCatalog: {type: Number, required: true},
  // example : Fall 2017
  termDescription:{type: String, required: true},

});

module.exports = mongoose.model("frontendAddCourse", addCourseSchema2Model);
