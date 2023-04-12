const mongoose = require('mongoose');

const NotesSchema = mongoose.Schema({

    title: {
        type: String,
    },

    body: {
        type: String,
        required: true,
    },

    date: {
        type: Date,
        default: Date.now,
    },

})

exports.Notes = mongoose.model('Special-Notes', NotesSchema);


