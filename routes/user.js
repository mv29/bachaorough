const route = require('express').Router();
const User = require('../db/models').User ;// reqiuring the user table
const passport = require('../passport');// rqiured the passport directory

route.get('/signin',function (req,res) {
    const messages1=req.flash('error');
    res.render('signin',{messages1:messages1,hasErrors1:messages1.length>0});
})
route.get('/signup',function (req,res) {
    res.render('signup');
});

route.post('/signup', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    }).then((user) => {
        res.redirect('/user/signin')
    })
});

route.post('/signin', passport.authenticate('local', {
    successRedirect: '/pages/profile',
    failureRedirect: '/user/signin',
    failureFlash: true
}));
exports = module.exports = route;


