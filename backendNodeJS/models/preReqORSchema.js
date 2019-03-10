const mongoose = require('mongoose');
const preReqORSchema = mongoose.Schema({
  object: mongoose.Mixed
});
module.exports = preReqORSchema;
