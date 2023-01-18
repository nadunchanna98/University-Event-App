const mongoose = require('mongoose');

const TeamSchema = mongoose.Schema({

    team : {
        type: String,
        required: true,
    },

    teamID : {
        type: Number,
        required: true,
    },

    total: {
        type: Number,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },
  
    recentAdded: {
        type: Number,
        required: true,
    },

    dateCreated: {
        type: Date,
        default: Date.now,
    },

   
})


exports.Teams = mongoose.model('Teams', TeamSchema);


