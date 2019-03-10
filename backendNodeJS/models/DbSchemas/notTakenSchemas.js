const mongoose = require('mongoose');
const notTakenSchema = mongoose.Schema({
    object: mongoose.Mixed
});
module.exports = notTakenSchema;
