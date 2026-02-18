const mongoose = require('mongoose');

const specialistSchema = new mongoose.Schema({
  area: {
    type: String,
    required: [true, 'El área es requerida'],
    trim: true
  },
  name: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  active: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Specialist', specialistSchema);
