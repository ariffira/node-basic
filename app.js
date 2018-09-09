// include expressjs
const express = require('express');
// use express function to app variable. express() is a top-level function exported by the express module
const app = express();
const path = require('path');
const myRoutes = require('./routes/myRoutes.js');

// express static folder for assets (css, images, js, libs and uploads)
app.use(express.static(__dirname + '/public'));

// setting ejs template engine for html file
// all file inside views folder with html extension can be use
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// create a get routes for '/' with arrow function
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

// another route without arrow function localhost:3000/test
app.get('/test', function(req, res){
    res.send("My Test route!");
});

// home page route by get method
app.get('/home', function (req, res) {
    res.send("<h1>Homepage</h1>");
});

// login page route by post method
app.post('/login', function (req, res) {
    res.send("<h1>Login Page</h1>");
});

// login page route by post method
app.all('/gallery', function (req, res) {
    res.send("<h1>My Gallery</h1>");
});

// user page route by post method
app.get('/user/:userId', function (req, res) {
    res.send("<h1>User Profile Page by User Id: " + req.params.userId + "</h1>");
});

// use myRoutes to get all routes from there
app.use('/myRoutes', myRoutes);

// app.listen(3000);
app.listen(3000, () => console.log('My App listening on port 3000! Express is awesome!!!'));
