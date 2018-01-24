
const passport = require('passport');
const strategies = require('./strategies');
const User = require('../db/models').User; // important remember the syntax

passport.use(strategies.localStrategy);
passport.use(strategies.Facebookstrategy);
passport.use(strategies.github);
passport.serializeUser(function (user, done) {
   // console.log('serialize' + user );
    done(null, user.id)
});

passport.deserializeUser(function(userId, done) {
 //   console.log('serialize' + userId );
    User.findOne({
        where: {id: userId}
    })
        .then((user) => done(null, user))
        .catch((err) => done(err))
});

exports = module.exports = passport;
