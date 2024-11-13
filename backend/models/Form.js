const mongoose = require('mongoose');

const inputSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['email', 'text', 'password', 'number', 'date'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  placeholder: String,
  order: Number
});

const formSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  inputs: [inputSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Form', formSchema);