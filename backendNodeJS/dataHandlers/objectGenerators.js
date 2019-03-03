var exports = module.exports = {};

exports.generateCourseObject = function (CourseModel,
                                         courseSubject,
                                         courseCatalog,
                                         courseTitle,
                                         courseCredits) {
  return new CourseModel({
    courseSubject: courseSubject,
    courseCatalog: parseInt(courseCatalog),
    courseTitle: courseTitle,
    courseCredits: parseFloat(courseCredits)
  });
};

exports.generatePreReqObject = function (preReqORModel, arrObj) {
  let model = new preReqORModel;
  model.arr = arrObj;
  model.markModified('arr');
  return model;
};

// exports.generatePreReqObject = function (preReqORModel,
//                                          courseSubject,
//                                          courseCatalog,
//                                          preReqORWC1,
//                                          preReqORsubject1,
//                                          preReqORCode1,
//                                          preReqORWC2,
//                                          preReqORsubject2,
//                                          preReqORCode2,
//                                          preReqORWC3,
//                                          preReqORsubject3,
//                                          preReqORCode3,
//                                          preReqORWC4,
//                                          preReqORsubject4,
//                                          preReqORCode4,
//                                          preReqORWC5,
//                                          preReqORsubject5,
//                                          preReqORCode5,
//                                          preReqORWC6,
//                                          preReqORsubject6,
//                                          preReqORCode6) {
//   return new preReqORModel({
//     courseSubject: courseSubject,
//     courseCatalog: courseCatalog,
//
//     preReqORWC1: preReqORWC1,
//     preReqORsubject1: preReqORsubject1,
//     preReqORCode1: preReqORCode1,
//     preReqORWC2: preReqORWC2,
//     preReqORsubject2: preReqORsubject2,
//     preReqORCode2: preReqORCode2,
//     preReqORWC3: preReqORWC3,
//     preReqORsubject3: preReqORsubject3,
//     preReqORCode3: preReqORCode3,
//     preReqORWC4: preReqORWC4,
//     preReqORsubject4: preReqORsubject4,
//     preReqORCode4: preReqORCode4,
//     preReqORWC5: preReqORWC5,
//     preReqORsubject5: preReqORsubject5,
//     preReqORCode5: preReqORCode5,
//     preReqORWC6: preReqORWC6,
//     preReqORsubject6: preReqORsubject6,
//     preReqORCode6: preReqORCode6
//   });
// };



