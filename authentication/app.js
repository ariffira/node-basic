const express = require("express");
const app = express();
const PORT = process.env.PORT || 5001;
const bodyParser = require("body-parser");
const path = require("path");
const session = require('express-session');

// add mongoose package
const mongoose = require('mongoose');

// configuration passport files 
const passport = require('passport');
require('./config/passport')(passport); // pass passport for configuration

/**
 * all models add here
 */
const User = require('./models/user');

// connect mongoose using localhost
mongoose.connect('mongodb://localhost/authTest');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

/**
 * All use of middleware add here
 */
// set public folder for static files css, images
app.use(express.static(__dirname + '/public'));

// using body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'arifisaspy',
    cookie: {
        maxAge: 864001000 //  1 day
    },
    resave: false,
    saveUninitialized: true
}));

/*  PASSPORT USE  */
app.use(passport.initialize());
app.use(passport.session());

/**
 * All routes
 */
// registration form route
app.get('/', (req, res) => {
    res.render('registration', { pageTitle: 'registration page'});
});

// posting resgitration form data to save in MongoDB
app.post('/registration', (req, res) => {
    // create a new user object as like your user schema
    let newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        createdAt: Date.now()
    });

    // Save the user to database
    newUser.save(err => {
        if(err) throw err;
        console.log('A new User Saved to Database!');
        res.redirect('/signin');
    });
});

// show sign in form
app.get('/signin', (req, res)=> {
  res.render('signin', { pageTitle: "Sign-in page"});
});

/* // post signin data and give access
// Without passport
app.post('/signin', (req, res)=> {
  let email = req.body.email;
  let password = req.body.password;
  // find user by this email
  let query = { email: email };
  User.findOne(query, (err, user)=> {
      if(err) throw err;
      if((email == user.email) && (password === user.password)){
        res.redirect('/homepage');
      }
      else {
        res.redirect('/signin');
      }
    });
}); */


// post signin data and give access Using PASSPORT-Local
app.post('/signin', passport.authenticate('local', { failureRedirect: '/signin' }), (req, res)=> {
    res.redirect('/homepage');
});

// homepage after successful signin
app.get('/homepage', (req, res)=> {
    res.send('You have access!');
});

// facebook auth routes to apply facebook for login
// Send our user to Facebook to authenticate
app.get('/auth/facebook', passport.authenticate('facebook'));

// callback gacebook auth when they call u back
// Facebook sends our user back to our application here with token and profile information
app.get('/auth/facebook/callback', passport.authenticate('facebook', { 
    successRedirect : '/profile',
    failureRedirect: '/signin' 
 }
));

// profile page
app.get('/profile', (req, res)=> {
    res.render('profile', { user: req.user }); //if any user exist
});


app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/signin');
});

// listen the server 
app.listen(PORT, ()=> {
    console.log("Server is running on port number" + PORT);
});