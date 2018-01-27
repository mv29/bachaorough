const route = require('express').Router();
const User = require('../db/models').User ;// reqiuring the user table
const User_expenditure = require('../db/models').User_expenditure; // reqiuring the user table
const passport = require('../passport');// rqiured the passport directory

// profile
route.get('/profile', (req, res) => {
    if (req.user) {
        return res.render('profile', {user: req.user})
    }
    res.redirect('/user/signin')
});
//

// expenditures
route.get('/expenditure', (req, res) => {
  //  console.log(req.user);
    if (req.user) {
        return res.render('expenditure', {user: req.user})
    }
    res.redirect('/user/signin');


});
route.get('/expenditure/lol', (req, res) => { // displaying the expenditure data from database
    console.log("madarchod aman mujha ganda bol raha tha loda ka chilka");
    console.log(req.query.year);
    console.log(req.query.month);
    console.log(req.query.date);
    console.log(req.user.username);
      User_expenditure.findOne({ // searching int the user table for an object with name username
            where: {
                username: req.user.username,
                year: req.query.year,
                month: req.query.month,
                date: req.query.date,
            }
        }).then((user) => {
            console.log(user);
            return res.render('expenditure', {user: user})
        }).catch((err) => {
            return console.log(err);
        })
});
route.post('/expenditure', (req, res) => {
    const lol =new Date();
    User_expenditure.create({
        username: req.user.username,
        year: parseInt(lol.getFullYear()),
        month: parseInt(lol.getMonth())+1,
        date: parseInt(lol.getDate()),
        food: parseFloat(req.body.food),
        clothing: parseFloat(req.body.clothing),
        travel: parseFloat(req.body.travel),
        entertainment: parseFloat(req.body.entertainment)
    }).then((user) => {
        res.redirect('/pages/expenditure');
    }).catch((err) => {
        return console.log(err);
    });
});
//

route.get('/chat', (req, res) => {
   // console.log(req.user);
    if (req.user) {
        return res.render('/chat.html');
    }
    res.redirect('/user/signin');
});

exports = module.exports = route;