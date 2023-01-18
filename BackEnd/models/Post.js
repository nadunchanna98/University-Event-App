//post schema

const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
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
    firstN: {
        type: String,
    },
    secondN: {
        type: String,
    },
    thirdN: {
        type: String,
    },
    firstT: {
        type: String,
        required: true
    },
    secondT: {
        type: String,
        required: true
    },
    thirdT: {
        type: String,
        required: true
    },
    description: {
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


exports.Post = mongoose.model('Post', postSchema);
