const mongoose = require('mongoose');
const config = require('../config/Config')

mongoose.connect(config.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
