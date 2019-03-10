const mongoose = require('mongoose');
const preReqOnlySchema = mongoose.Schema({
    object: mongoose.Mixed
});
module.exports = preReqOnlySchema;
