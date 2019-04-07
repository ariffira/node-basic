const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const indexRouter = require('./routes/index');
const bodyParser = require('body-parser');

// connect mongoose
mongoose.connect('mongodb://test:test1234@ds129914.mlab.com:29914/fbw4', { useNewUrlParser: true})
.then(()=>{
    console.log('MONGO DB Connected.....27017 port');
})
.catch(()=> {
    console.log(' Errors to connect database. bad programmer');
})

app.use(bodyParser.urlencoded({
    extended: false
}));

// use a static folder
app.use(express.static(__dirname + '/public'));
// setup view engine
app.set('view engine', 'hbs');

// setup express session
app.use(session({
    secret: 'iamaspy',
    cookie: {
        maxAge: 864001000 // 1 day(1000*60*60*24)
    },
    resave: false,
    saveUninitialized: true
}));

app.use('', indexRouter);

/**
 * route error handler
 * execute when no route matches
 */
app.get('*', (req, res)=> {
    res.send('<h1>404</h1> This is wrong route. Please contact to the owner');
});

app.listen(5000, (req, res)=> {
   console.log(' Server is running on port 5000');
});