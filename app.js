const app = require("express")()
const json_parser = require('body-parser').json()

app.use(json_parser);

require('./loaders');
app.get('/', (req, res, next) => {
  res.status(200).send("Hello World");
});

var authentication = require('./services/authentication');
var items = require('./services/items');
app.post('/register', authentication.register);
app.post('/sign_in', authentication.sign_in);

app.post('/items', items.addItem);
app.get('/items', items.getItems);

module.exports = app;
