const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const path = require("path");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

//localhost mongodb
//mongoose.connect('mongodb://localhost/advanceDb');

//online mongodb cloud database
mongoose.connect('mongodb://test:test1234@ds129914.mlab.com:29914/fbw4', { useNewUrlParser: true });

// set the template engine views
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'hbs');

// set public folder for static files css, images
app.use(express.static(__dirname + '/public'));

// use bodyparser
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

// routes
// index routes
const indexRoute = require('./routes/index');
app.use('', indexRoute);

app.listen(PORT, ()=> {
    console.log("Server is running on port number" + PORT);
});