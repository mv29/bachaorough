const route = require('express').Router();
const User = require('../db/models').User ;// reqiuring the user table
const passport = require('../passport');// rqiured the passport directory

route.get('/signin', (r,s) => s.render('signin'));
route.get('/signup', (r,s) => s.render('signup'));

route.post('/signup', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    }).then((user) => {
        console.log(user);
        res.redirect('/user/signin')
    })
});

route.post('/signin', passport.authenticate('local', {
    successRedirect: '/pages/profile',
    failureRedirect: '/user/signin'
}));
exports = module.exports = route;


