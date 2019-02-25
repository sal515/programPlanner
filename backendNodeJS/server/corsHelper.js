var exports = module.exports = {};
// We need the CORS because of our decoupled architecture, which means the frontEnd and backEnd server are different
exports.setCorsHeaders = function (res, req, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS");
};
