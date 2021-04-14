const mongoose = require('mongoose');

module.exports = mongoose.model('user', new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  salted_hash: String,
}));
