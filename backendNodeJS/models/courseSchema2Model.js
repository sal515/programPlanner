const mongoose = require('mongoose');
const courseSchema2Model = mongoose.Schema({

  // courseSubject example: COEN
  courseSubject: {type: String, required: true},

  // courseCatalog example: 311
  courseCatalog: {type: Number, required: true},

  // example : Fall 2017
  termDescription:{type: String, required: true},

    // courseTitle example: Molecular and General Genetics
  courseTitle: {type: String, required: true},

  // classNumber: the specific code for each lecture, tutorial, and lab
  classNumber: {type: Number, required: true},

  // courseCredits example: 3.5   --> Note: In JS float are also referred as of type "Number"
  courseCredits: {type: Number, required: true}
});

module.exports = mongoose.model("availableCourses", courseSchema2Model);
