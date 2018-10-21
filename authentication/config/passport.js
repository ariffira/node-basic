// add passport and its other related middleware
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// include user model 
const User = require('../models/user');

module.exports = function(passport) {
    passport.serializeUser(function(user, cb) {
        cb(null, user.id);
    });
    
    passport.deserializeUser(function(id, cb) {
        User.findById(id, function(err, user) {
            cb(err, user);
        });
    });
    
    // local check of authentication
    passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done)=> {
        let query = { email: email } ;
        User.findOne(query, (err, user)=> {
            if(err) throw err;
            if(!user) {
                return done(null, false);
            }
            if(password != user.password) {
                return done(nul, false);
            }
            return done(null, user);
        });
    }));
}

