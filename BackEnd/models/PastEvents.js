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
        required: true
    },
    secondN: {
        type: String,
        required: true
    },
    thirdN: {
        type: String,
        required: true
    },
    firstT: {
        type: String,
        
    },
    secondT: {
        type: String,
        
    },
    thirdT: {
        type: String,
        
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


exports.Post = mongoose.model('Past-Events', postSchema);
