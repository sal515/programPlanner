const mongoose = require('mongoose');
const loginSchema = mongoose.Schema({

    loginUsername: {type: String, required: true},
    loginPassword: {type: String, required: true}

});

module.exports = mongoose.model("loginInfo", loginSchema);
