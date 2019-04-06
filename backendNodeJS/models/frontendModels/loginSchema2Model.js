const mongoose = require('mongoose');
const loginSchema2Model = mongoose.Schema({

    loginUsername: {type: String, required: true},
    loginPassword: {type: String, required: true}

});

module.exports = mongoose.model("loginInfo", loginSchema2Model);
