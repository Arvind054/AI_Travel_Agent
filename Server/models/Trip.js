const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    TripDetails:{
        type:String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model('Trip', TripSchema);