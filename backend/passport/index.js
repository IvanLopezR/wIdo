const passport = require('passport');
const mongoose = require('mongoose');
const session = require("express-session");
const MongoStore = require('connect-mongo')(session);

require('./serializers');
require('./localStrategy');

module.exports = (app) => {
  app.use(session({
    secret: 'irongenerator',
    resave: true,
    saveUninitialized: !true,
    rolling: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000
    },
    store: new MongoStore({ mongooseConnection: mongoose.connection, ttl: 24 * 60 * 60 })
  }))

  app.use(passport.initialize());
  app.use(passport.session());
}
