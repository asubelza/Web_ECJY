const mongoose = require('mongoose');

const toolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    enum: ['contabilidad', 'impuestos', 'nomina', 'facturacion', 'reportes', 'otro'],
    default: 'otro'
  },
  url: {
    type: String,
    trim: true
  },
  icon: {
    type: String,
    default: '🔧'
  },
  color: {
    type: String,
    default: '#0f3460'
  },
  isExternal: {
    type: Boolean,
    default: false
  },
  active: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Tool', toolSchema);
