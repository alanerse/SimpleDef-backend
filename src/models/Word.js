const mongoose = require('mongoose');

const WordSchema = new mongoose.Schema({
  
  nome: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  def: {
    type: String,
    required: true
  },
  exemple: {
    type: String,
    required: true
  },
  
});

module.exports = mongoose.model('Word', WordSchema);