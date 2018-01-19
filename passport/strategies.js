const LocalStrategy = require('passport-local').Strategy
const User = require('../db/models').User // including users table in local strategy also for local use
// ('../db').user wrong or right  doubt
const localStrategy = new LocalStrategy(
    (username, password, done) => {
        User.findOne({ // searching int the user table for an object with name username
            where: {
                username: username
            }
        }).then((user) => {
        //  console.log(user);
       //     console.log(typeuser);
            if (!user) {
                //Wrong username
                return done(null, false, {message: 'Wrong username'})
            }
            if (user.password === password) {
                // Correct user and password
                return done(null, user)
            } else {
                // Correct username, wrong password
                return done(null, false, {message: 'Wrong password'})
            }

        }).catch((err) => {
            return done(err)
        })
    });
//why we are exporting the localstrategy when we have included the
exports = module.exports = {
    localStrategy
}