const mongoose = require('mongoose');
const userSchema = mongoose.Schema({

    // userID should be 8 characters
    userID: {type: Number, required: true},

    // userPass is case sensitive
    userPassword: {type: String, required: true},

    // sequence should tell user when they started and if coop. Example: Fall start year 2 SOEN
    coop: {type: Boolean, required: true},

    // course should include catalog number and subject for now: ELEC 311
    courseHistory: {type: [String], required: true},

    // courseCredits example: 33.5   --> Note: In JS float are also referred as of type "Number"
    completedCredits: {type: Number, required: true},

    // saved sequences with the classNumbers of each lecture, tutorial, and lab
    fallSequence: {type: [Number]},
    winterSequence: {type: [Number]},
    summerSequence: {type: [Number]}

});

// The following takes the definition and models for data storage etc
// mongoose.model("dbModelName", mongooseSchema);

// The following is a model created from the layout created above
// The model has to be exported, so that it can be used outside of the file
// module.exports = mongoose.model("dbModelName", mongooseSchema);
module.exports = userSchema;
