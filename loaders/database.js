const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/dingsbum', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
