const item = require('../models/item');

exports.addItem = function (req, res) {
  const instance = new item({
    name: req.body.name,
    coordinates: req.body.coordinates,
    ownership: req.body.ownership
  })
  instance.save()
      .then((item) => {
          console.log(item);
          res.send('Item added.');
      })
      .catch((err) => {
        console.log(err);
      });
}

exports.getItems = (req, res) => {
  console.log(req.query.query);

  item.find({ name: req.query.query }, function (err, docs) {
    res.send(docs);
  })
}
