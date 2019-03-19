const mongoose = require('mongoose');
const courseSchema = mongoose.Schema({

  // courseSubject example: COEN
  courseSubject: {type: String, required: true},

  // courseCatalog example: 311
  courseCatalog: {type: Number, required: true},

  // courseTitle example: Molecular and General Genetics
  courseTitle: {type: String, required: true},

  // classNumber: the specific code for each lecture, tutorial, and lab
  classNumber: {type: Number, required: true},

  // courseCredits example: 3.5   --> Note: In JS float are also referred as of type "Number"
  courseCredits: {type: Number, required: true}
});

// The following takes the definition and models for data storage etc
// mongoose.model("dbModelName", mongooseSchema);

// The following is a model created from the layout created above
// The model has to be exported, so that it can be used outside of the file
// module.exports = mongoose.model("dbModelName", mongooseSchema);
// module.exports = courseSchema;

module.exports = mongoose.model("availableCourses", courseSchema);
