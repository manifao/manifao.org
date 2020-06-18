const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  data64: {
    type: String,
    required: true
  },
  orientation : {
    type: String,
    enum: ['H', 'V', 'SQ'],
    required: true
  },
  date: {
    type: Date,
    required: false
  }
});

ImageSchema.pre('save', function preSave(next){
  this.date = Date.now();
  next();
});

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;
