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

var authentication = require('./services/authentication');
var items = require('./services/items');

app.use('/users', authentication);

app.post('/items', items.addItem);
app.get('/items', items.getItems);


module.exports = app;
