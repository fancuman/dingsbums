require('./loaders');
const auth = require('./middleware/auth')

var passport = require("passport");
const app = require("express")()
app.use(passport.initialize());
const json_parser = require('body-parser').json()

app.use(json_parser);

app.get('/', (req, res, next) => {
  res.status(200).send("Hello World");
});

var user = require('./services/user');
var item = require('./services/item');

app.use('/users', user);
app.use('/items', item);

module.exports = app;
