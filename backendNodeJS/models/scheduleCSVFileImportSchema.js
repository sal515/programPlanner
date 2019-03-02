const mongoose = require('mongoose');
const scheduleCSVFileSchema = mongoose.Schema({
  termTitle: {type: String, required: true},
  termCode: {type: String, required: true},
  termDescription: {type: String, required: true},
  session: {type: String, required: true},
  courseSubject: {type: String, required: true},
  courseCatalog: {type: String, required: true},
  section: {type: String, required: true},
  componentCode: {type: String, required: true},
  classNumber: {type: String, required: true},
  courseTitle: {type: String, required: true},
  locationCode: {type: String, required: true},
  instructionModeCode: {type: String, required: true},

  roomCode: {type: String, required: true},
  buildingCode: {type: String, required: true},
  roomNumber: {type: String, required: true},

  startTimeHour: {type: String, required: true},
  startTimeMin: {type: String, required: true},
  classStartTimeMin: {type: String, required: true},
  classStartTimeHourMin: {type: String, required: true},
  classDuration: {type: String, required: true},
  classEndTimeMin: {type: String, required: true},
  endTimeHour: {type: String, required: true},
  endTimeMin: {type: String, required: true},
  classEndTimeHourMin: {type: String, required: true},

  Mon: {type: String, required: true},
  Tues: {type: String, required: true},
  Wed: {type: String, required: true},
  Thurs: {type: String, required: true},
  Fri: {type: String, required: true},
  Sat: {type: String, required: true},
  Sun: {type: String, required: true},

  startDay: {type: String, required: true},
  startMonth: {type: String, required: true},
  startYear: {type: String, required: true},
  startDateDMY: {type: String, required: true},
  endDay: {type: String, required: true},
  endMonth: {type: String, required: true},
  endYear: {type: String, required: true},
  endDateDMY: {type: String, required: true}
});
module.exports = scheduleCSVFileSchema;
