const mongoose = require('mongoose');
const userSchema2Model = mongoose.Schema({

  // userID should be 8 characters
  userID: {type: String, required: true},

  // userPass is case sensitive
  userPassword: {type: String},
  // userPassword: {type: String, required: true},

  // sequence should tell user when they started and if coop. Example: Fall start year 2 SOEN
  coop: {type: Boolean},
  // coop: {type: Boolean, required: true},

  // course should include catalog number and subject for now: ELEC 311
  // courseHistory: {tags: [{type: String}]},
  // courseHistory: {type: Map, of: [String]},
  courseHistory: {type: Map},
  // courseHistory: {type: String},
  courseCart: {type: Map},
  // courseCart: {type: Map, of: [String]},

  // courseCredits example: 33.5   --> Note: In JS float are also referred as of type "Number"
  completedCredits: {type: Number},
  // completedCredits: {type: Number, required: true},

  // saved sequences with the classNumbers of each lecture, tutorial, and lab
  fallSequence: {type: [Map]},
  winterSequence: {type: [Map]},
  summerSequence: {type: [Map]},

  // fallSequence: {type: [mongoose.Mixed]},
  // winterSequence: {type: [mongoose.Mixed]},
  // summerSequence: {type: [mongoose.Mixed]},

  // temporary sequences used to hold all the courses added by the user
  // and  generating combinations of sections
  // then saving the final schedules to the sequences above
  // tempFallSequence: {type: [mongoose.Mixed]},
  // tempWinterSequence: {type: [mongoose.Mixed]},
  // tempSummerSequence: {type: [mongoose.Mixed]}

  tempFallSequence: {type: [Map]},
  tempWinterSequence: {type: [Map]},
  tempSummerSequence: {type: [Map]}
  // tempWinterSequence: {type: [mongoose.Mixed]},
  // tempSummerSequence: {type: [mongoose.Mixed]}

});

module.exports = mongoose.model("userInfo", userSchema2Model);
