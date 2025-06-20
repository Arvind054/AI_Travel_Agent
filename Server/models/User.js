const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
      type:String,
      required: true,
    },
    email : {
        type: Email,
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

module.exports = mongoose.model('User', UserSchema);