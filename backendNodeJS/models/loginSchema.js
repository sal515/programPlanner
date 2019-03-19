const mongoose = require('mongoose');
const loginSchema = mongoose.Schema({

    loginUsername: {type: Number, required: true},
    loginPassword: {type: String, required: true}

});

// The following takes the definition and models for data storage etc
// mongoose.model("dbModelName", mongooseSchema);

// The following is a model created from the layout created above
// The model has to be exported, so that it can be used outside of the file
// module.exports = mongoose.model("dbModelName", mongooseSchema);
module.exports = mongoose.model("loginInfo", loginSchema);
