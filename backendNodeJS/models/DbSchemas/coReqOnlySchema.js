const mongoose = require('mongoose');
const coReqOnlySchema = mongoose.Schema({
    object: mongoose.Mixed
});
module.exports = coReqOnlySchema;
