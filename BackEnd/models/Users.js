const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({

    token: {
        type: String,
        required: true,
    },

})

exports.Users = mongoose.model('Users-Details', UsersSchema);


