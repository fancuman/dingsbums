var passport = require("passport");
var passportJWT = require("passport-jwt");
const config = require('../config/Config')
const User = require('../models/user');

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = config.JWT_SECRET;

var strategy = new JwtStrategy(jwtOptions, async function (jwt_payload, next) {
  console.log('payload received', jwt_payload);
  try {
    var user = await User.findOne({ _id: jwt_payload.id });
    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  } catch (error) {
    next(null, false);
  }

});

passport.use(strategy);