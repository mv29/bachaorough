const route = require('express').Router();
const User = require('../db/models').User ;// reqiuring the user table
const User_expenditure1 = require('../db/models').User_expenditure1; // reqiuring the user table
const passport = require('../passport');// rqiured the passport directory
//route.use('/public', __express.static(__dirname + '../public/'));


route.get('/profile', (req, res) => {
    if (req.user) {
        return res.render('profile', {user: req.user})
    }
    res.redirect('/user/signin')
});
/*
route.get('/public/chat', (req, res) => {
    if (req.user) {
        return res.render('../public/chat')
    }
    res.redirect('/user/signin')
});
*/

route.get('/expenditure', (req, res) => {
    if (req.user) {
        return res.render('expenditure', {user: req.user})
    }
    res.redirect('/user/signin')


});

route.get('/expenditure/lol', (req, res) => {
    User_expenditure1.findOne({ // searching int the user table for an object with name username
        where: {
            username: req.query.username+req.query.date
        }
    }).
    then((user) => {
        return res.render('expenditure', {user: req.user})
    }).catch((err) => {
        return done(err)
    })
});

route.post('/expenditure', (req, res) => {
 User_expenditure1.create({

        username: req.body.username+req.body.date,
        food: parseFloat(req.body.food),
        clothing: parseFloat(req.body.clothing),
        travel: parseFloat(req.body.travel)
    }).then((user) => {
        res.redirect('/pages/expenditure');
    })
});

exports = module.exports = route;