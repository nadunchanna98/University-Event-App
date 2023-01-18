const mongoose = require('mongoose');

const FutureEventsSchema = mongoose.Schema({
    event: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
    },
    type: {
        type: String,
    },
    description: {
        type: String,
    },
    location: {
        type: String,
    },
    date: {
        type: Date,
        required: true
    },
    image: {
        type: String,
        default: ''
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
})


exports.FuturePost = mongoose.model('FuturePost', FutureEventsSchema);


