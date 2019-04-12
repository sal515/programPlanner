const mongoose = require('mongoose');
const userSchema2Model = mongoose.Schema({

  // userID should be 8 characters
  userID: {type: String, required: true},

  // userPass is case sensitive
  userPassword: {type: String},

  // sequence should tell user when they started and if coop. Example: Fall start year 2 SOEN
  coop: {type: Boolean},

  // course should include catalog number and subject for now: ELEC 311
  courseHistory: {type: Map},

  courseCart: {type: Map},

  // courseCredits example: 33.5   --> Note: In JS float are also referred as of type "Number"
  completedCredits: {type: Number},

  // saved sequences with the classNumbers of each lecture, tutorial, and lab
  schedule: {type: [Map]},
  // winterSequence: {type: [Map]},
  // summerSequence: {type: [Map]},

  tempSchedule: {type: [Map]}
  // tempWinterSequence: {type: [Map]},
  // tempSummerSequence: {type: [Map]}

});

module.exports = mongoose.model("userInfo", userSchema2Model);
