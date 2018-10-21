// add passport and its other related middleware
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

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

    //facebook login authentication
    const FACEBOOK_APP_ID = '250606322290817'; // add your own app ID
    const FACEBOOK_APP_SECRET = '08c45b21a02694c3426c46a05368a623'; // add secret key
    const callbackURL = 'http://localhost:5001/auth/facebook/callback';
    passport.use(new FacebookStrategy({
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: callbackURL
      },
      function(accessToken, refreshToken, profile, done) {
          console.log(profile.accessToken);
          User.findOne({ 'fb_id': profile.id }, (err, user)=> {
            if (err) return done(err);
            
            // if the user is found, then log them in
            if (user) {
                return done(null, user); // user found, return that user
            } else {
                // if there is no user found with that facebook id, create them
                let newUser = new User();
                
                // set all of the facebook information in our user model
                newUser.fb_id    = profile.id; // set the users facebook id                   
                newUser.fb_token = accessToken; // we will save the token that facebook provides to the user                    
                newUser.fb_name  = profile.displayName;
                // newUser.fb_email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

                // save our user to the database
                newUser.save(function(err) {
                    if (err) throw err;
                    
                    // if successful, return the new user
                    return done(null, newUser);
                });
            }
        });
      }
    ));
}

