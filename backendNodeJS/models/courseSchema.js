const mongoose = require('mongoose');
const courseSchema = mongoose.Schema({
  // title: {type: String, required: true},
  // content: {type: String, required: true}
  // id: {type: String, required: true},
  courseType: {type: String, required: true},
  courseCode: {type: Number , required: true}
});

// The following takes the definition and models for data storage etc
// mongoose.model("dbModelName", mongooseSchema);

// The following is a model created from the layout created above
// The model has to be exported, so that it can be used outside of the file
// module.exports = mongoose.model("dbModelName", mongooseSchema);
module.exports = courseSchema;
