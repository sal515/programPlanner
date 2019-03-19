const mongoose = require('mongoose');
const preReqOnlySchema = mongoose.Schema({
    object: mongoose.Mixed
});
module.exports = mongoose.model("preReqOnly", preReqOnlySchema);
// module.exports = preReqOnlySchemaModel;
