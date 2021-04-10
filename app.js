require('./loaders');

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
app.post('/register', authentication.register);
app.post('/sign_in', authentication.sign_in);

app.post('/items', items.addItem);
app.get('/items', items.getItems);

app.get("/secret", passport.authenticate('jwt', { session: false }), function (req, res) {
  res.json("Success! You can not see this without a token");
});

module.exports = app;
