const mongoose = require('mongoose');
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  coordinates: { type: [Number], index: '2dsphere', required: true },
  ownership: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
})

ItemSchema.plugin(mongoose_fuzzy_searching, { fields: ['name', 'description'] });

module.exports = mongoose.model('item', ItemSchema);
