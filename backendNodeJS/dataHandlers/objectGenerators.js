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


exports.generatePreReqObject = function (preReqORModel, dataObj) {
return new preReqORModel({
  object: dataObj
})
};



