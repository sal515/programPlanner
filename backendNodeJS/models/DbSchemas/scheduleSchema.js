const mongoose = require('mongoose');
const scheduleSchema = mongoose.Schema({
    object: mongoose.Mixed
});
module.exports = scheduleSchema;
