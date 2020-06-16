const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: false
  }
});

MessageSchema.pre('save', function preSave(next){
  this.date = Date.now();
  next();
});

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
