const mongoose = require('mongoose');
const preReqORSchema = mongoose.Schema({
  object: mongoose.Mixed
});
module.exports = mongoose.model("preReqOR", preReqORSchema);
// module.exports = preReqORSchemaModel;
