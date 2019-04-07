const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const path = require("path");

// set the template engine views
app.set('view engine', 'hbs');

// set public folder for static files css, images
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res)=> {
   res.render('index');
});

app.listen(PORT, (req, res)=> {
    console.log('Start...Server is running successfully on port ' + PORT)
});