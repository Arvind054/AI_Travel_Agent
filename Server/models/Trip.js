//Trip Schema
const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  source:{
    type: String,
    require: true,
  },
  destination:{
      type: String,
      required: true,
  },
  tripDetails: {
    type: mongoose.Schema.Types.Mixed, 
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Trip', TripSchema);
