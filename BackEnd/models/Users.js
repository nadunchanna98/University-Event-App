const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({

    token: {
        type: String,
        required: true,
    },

    theme: {
        type: Boolean,
        required: true,
    },

})

exports.Users = mongoose.model('Users-Details', UsersSchema);


