const LocalStrategy = require('passport-local').Strategy;
const User = require('../db/models').User ;// including users table in local strategy also for local use
const FacebookStrategy =require('passport-facebook').Strategy;
const GitHub =require('passport-github').Strategy;

const localStrategy = new LocalStrategy(
    (username, password, done) => {
        User.findOne({ // searching int the user table for an object with name username
            where: {
                username: username
            }
        }).then((user) => {
            if (!user) {
                //Wrong username

                return done(null, false, {message: 'Wrong username'})
            }
            if (user.password === password) {
                // Correct user and password
                return done(null, user)
            } else {
                // Correct username, wrong password
          //      console.log("lol");
                return done(null, false, {message: 'Wrong password'})
            }

        }).catch((err) => {
            return done(err)
        })
    });

const Facebookstrategy = new FacebookStrategy({

        clientID        : '143780762922533',
        clientSecret    : '62ee8447811db44da1b0c4d52e585fa7',
        callbackURL     : "http://localhost:3232/user/facebook/callback"

    },
    function(token, refreshToken, profile, done) {

    process.nextTick(function() {
            User.findOne({
                where: {
                    username: profile.displayName
                }
            }).then((user) => {
                // if the user is found, then log them in
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user found with that facebook id, create them
                    User.create({
                         username: profile.displayName
                    }).then((user) => {
                        return done(null, user); // user created
                    }).catch((err) => {
                        return done(err)
                    })
                }
            }).catch((err) => {
                return done(err)
            })
        });
    });
const github = new GitHub({

        clientID        : 'b362333ed800b66719a8',
        clientSecret    : '769d7ca96ef656d6bc09344f9901e1a133905855',
        callbackURL     : "http://localhost:3232/user/github/callback"

    },
    function(token, refreshToken, profile, done) {

   // console.log(profile);
        process.nextTick(function() {
            User.findOne({
                where: {
                    username: profile.username
                }
            }).then((user) => {
                // if the user is found, then log them in
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user found with that facebook id, create them
                    User.create({
                        username: profile.username
                    }).then((user) => {
                        return done(null, user); // user created
                    }).catch((err) => {
                        return done(err)
                    })
                }
            }).catch((err) => {
                return done(err)
            })
        });
    });

//why we are exporting the localstrategy when we have included the
exports = module.exports = {
    localStrategy,
    Facebookstrategy,
    github
};