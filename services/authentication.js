const user = require('../models/user');

// var passport = require('passport');
// , LocalStrategy = require('passport-local').Strategy;
const argon2 = require('argon2');

exports.register = (req, res) => {
  console.log(req.body);
  argon2.hash(req.body.password, { type: argon2.argon2id }).then(function (salted_hash) {
    const instance = new user({
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


exports.sign_in = (req, res) => {
  user.findOne({ username: req.body.username }, function (err, user) {
    console.log(user)
    argon2.verify(user.salted_hash, req.body.password)
      .then(status => {
        if (status === true) { res.send('Username and password match!') }
        else { res.send('Uh-oh') };
      })
  });
}
