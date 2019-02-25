const mongoose = require('mongoose');

// type script for string is lower case  -->> string
// nodeJS and javascript is upper case -->> String


// https://mongoosejs.com/docs/guide.html

// This is to just create a schema or definition of a table
// Also similar to a constructor
// This is basically a layout of the structure
const exampleMongooseSchema = mongoose.Schema({
  name: String
  // title: {type: String, required: true},
  // content: {type: String, required: true}
});

// The following takes the definition and models for data storage etc
// mongoose.model("dbModelName", mongooseSchema);

// The following is a model created from the layout created above
// The model has to be exported, so that it can be used outside of the file
// module.exports = mongoose.model("dbModelName", mongooseSchema);
module.exports = exampleMongooseSchema;
