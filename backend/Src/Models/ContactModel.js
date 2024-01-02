const mongoose = require('mongoose');

const ContactData = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    Phone_Number: {
        type: String,
        require: true
       
    },
   Address: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    }

});

const ContactDataModel = mongoose.model('contact', ContactData);
module.exports = ContactDataModel;