const route = require('express').Router();
const User = require('../db/models').User ;// reqiuring the user table
const passport = require('../passport');// rqiured the passport directory

// signup
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
//

// signin
route.get('/signin',function (req,res) {
    const messages1=req.flash('error');
    res.render('signin',{messages1:messages1,hasErrors1:messages1.length>0});
});

route.post('/signin', passport.authenticate('local', {
    failureFlash: true,
    successRedirect: '/pages/profile',
    failureRedirect: '/user/signin',
}));

// facebook
route.get('/facebook', passport.authenticate('facebook', {
    scope : ['public_profile', 'email']
}));
route.get('/facebook/callback',
    passport.authenticate('facebook',
        {
            successRedirect: '/pages/profile',
            failureRedirect: '/user/signin',
        }
        )
);
//
// github
route.get('/github', passport.authenticate('github', {
    scope : ['public_profile', 'email']
}));

route.get('/github/callback',
    passport.authenticate('github',
        {
            successRedirect: '/pages/profile',
            failureRedirect: '/user/signin',
        }
    )
);
//
exports = module.exports = route;


