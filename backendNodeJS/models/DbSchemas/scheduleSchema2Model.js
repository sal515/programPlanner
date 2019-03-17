const mongoose = require('mongoose');
const scheduleSchema = mongoose.Schema({
    object: mongoose.Mixed
});
module.exports = mongoose.model("schedule", scheduleSchema);
// module.exports = scheduleSchemaModel;
