const express = require('express');
const router = express.Router();
const User = require('../models/user');
const permission = require('../config/permission');
/**
 * Registration form page
 */
router.get('/', permission.checkLogin, (req, res)=> {
   console.log(req.sessionID)
   res.render('index');
});

// post data for registration
router.post('/signup', (req, res)=> {
   //let { name, role, email, password } = req.body;
   let user = {
       name: req.body.name,
       role: req.body.role,
       email: req.body.email,
       password: req.body.password,
       address: {
           city: 'Köln',
           zip: 45139,
           street: 'test 7',
           country: 'Germany'
       }
   }
   const newUser = new User(user);
   newUser.save(err=> {
       if(err) throw err;
       res.redirect('/login');
   });
});

/**
 * Login form page
 */
router.get('/login', permission.checkLogin, (req, res)=> {
   res.render('login');
});

/**
 * Check login authentication for local
 */
router.post('/login', (req, res)=> {
   let { email, password } = req.body;
   const query = { email: email }
   User.findOne(query, (err, user)=> {
       if(err) throw err; // if errors show it or go next line
       if(password === user.password) {
         // save user role in session data
         req.session.user = user;
         console.log(req.sessionID)
         req.session.save();
         //res.json(user);
         res.render('profile', {
             user: user
         });
       } else {
           res.json('Wrong Password!');
       }
   });
});

/**
 *  User List page
 */
router.get('/user/list', permission, (req, res)=> {
   console.log(req.session.role);
   let userList = User.find();
   userList.exec((err, users)=> {
       if(err) throw err;
       res.json(users);
   });
});

/**
 * User log out
 */
router.get('/logout', (req, res)=> {
    req.session.destroy();
    res.redirect('/login');
});

module.exports = router;