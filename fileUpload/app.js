const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const path = require("path");
const uploadRouter = require('./routes/upload');

// set the template engine views
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'hbs');

// set public folder for static files css, images
app.use(express.static(__dirname + '/public'));

// routes
app.use('/upload', uploadRouter);

app.get('/', (req, res)=> {
   res.render('profile');
});

app.listen(PORT, ()=> {
    console.log("Server is running on port number" + PORT);
});