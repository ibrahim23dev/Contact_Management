const mongoose = require('mongoose');

const AuthModel = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true,
        select: false
    }
});

const AuthDataModel = mongoose.model('Auth', AuthModel);
module.exports = AuthDataModel;