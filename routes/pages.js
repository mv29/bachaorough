const route = require('express').Router();
const User = require('../db/models').User ;// reqiuring the user table
const User_expenditure1 = require('../db/models').User_expenditure1; // reqiuring the user table
const passport = require('../passport');// rqiured the passport directory

route.get('/profile', (req, res) => {
    if (req.user) {
        return res.render('profile', {user: req.user})
    }
    res.redirect('/user/signin')
});
route.get('/chat', (req, res) => {
    if (req.user) {
        return res.render('pr', {user: req.user})
    }
    res.redirect('/user/signin')
});
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
        console.log(user);
        return res.render('expenditure', {user: user })
    }).catch((err) => {
        return console.log('error');
    })
    });
route.post('/expenditure', (req, res) => {
    console.log(req.user);
    if(req.body.username==req.user) {
        User_expenditure1.create({
            username: req.body.username + req.body.date,
            food: parseFloat(req.body.food),
            clothing: parseFloat(req.body.clothing),
            travel: parseFloat(req.body.travel)
        }).then((user) => {
            res.redirect('/pages/expenditure');
        })
    }
    else
    {

        res.redirect('/pages/expenditure');
    }
});

exports = module.exports = route;