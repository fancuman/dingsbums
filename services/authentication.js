const User = require('../models/user');
var jwt = require('jsonwebtoken');
const config = require('../config/Config')

// var passport = require('passport');
// , LocalStrategy = require('passport-local').Strategy;
const argon2 = require('argon2');

exports.register = (req, res) => {
  console.log(req.body);
  argon2.hash(req.body.password, { type: argon2.argon2id }).then(function (salted_hash) {
    const instance = new User({
      username: req.body.username,
      salted_hash: salted_hash
    });
    instance.save()
      .then((user) => {
        console.log(user);
        res.send('Registration successful!');
      })
      .catch((err) => {
        if (err.code === 11000) {
          res.status(409).send('This username has already been taken.');
        }
      }
      );
  });
};


exports.sign_in = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    const status = await argon2.verify(user.salted_hash, req.body.password);
    if (status === true) {
      var payload = { id: user._id };
      var token = jwt.sign(payload, config.JWT_SECRET);
      res.json({ message: "login success", token });
    } else
      res.status(404).send('Uh-oh');
  } catch (error) {
    res.status(400).send(error);
  }
}
