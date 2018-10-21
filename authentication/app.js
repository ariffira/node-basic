const express = require("express");
const app = express();
const PORT = 5001;
const bodyParser = require("body-parser");
//const pug = require("pug");
const path = require("path");

// add mongoose package
const mongoose = require('mongoose');
// add model user
//const User = require('./models/user');

// connect mongoose using localhost
mongoose.connect('mongodb://localhost/authTest');

// set the template engine views
app.set('views', path.join(__dirname + '/views'));
// set public folder for static files css, images
app.use(express.static(__dirname + '/public'));

// set template engine
//app.set('view engine', 'pug')

// using body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

/*  PASSPORT SETUP  */

const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

app.get('/success', (req, res) => res.send("Welcome "+req.query.username+"!!"));
app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
    User.findById(id, function(err, user) {
        cb(err, user);
    });
});


app.get('/', (req, res) => res.sendFile('auth.html', { root : __dirname}));


app.listen(PORT, ()=> {
    console.log("Server is running on port number" + PORT);
});