const mongoose = require('mongoose');

const buttonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('button', buttonSchema);
