var express = require('express');
var router = express.Router();

const User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home Page' });
});

// add userName
router.post('/addUser', (req, res)=> {
  //res.send('success');
    // create a new user object as like your user schema
    let newUser = new User({
        username: req.body.username,
        createdAt: Date.now()
    });
    // create new user and save data to DB
    newUser.save(err => {
        if(err) throw err;
        console.log('A new User Saved to Database!');
        res.redirect('/');
    });
});

module.exports = router;
