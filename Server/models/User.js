const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
      type:String,
      required: true,
    },
    email : {
        type: String,
        required: true,
    },
    trips:[
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Trip',
            required: false,
        }
    ]
});

module.exports = mongoose.model('TripUser', UserSchema);