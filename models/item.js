const mongoose = require('mongoose');

module.exports = mongoose.model('item', new mongoose.Schema({
    name: String,
    coordinates: { type: [Number], index: '2dsphere'},
    ownership: {type: mongoose.Schema.Types.ObjectId, ref: 'users'}
  }));
