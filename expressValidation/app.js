const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const hbs = require('hbs');

// set the template engine views
app.set('view engine', 'hbs');

// set public folder for static files css, images
app.use(express.static(__dirname + '/public'));
// set body parser
app.use(bodyParser.urlencoded({ extended: false }));
// use express validator in the app
app.use(expressValidator());

hbs.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

app.get('/', (req, res)=> {
    res.render('index', {
        title: 'express validation test'
    });
});

/**
 * On post data we will test data validation below
 */
app.post('/create', (req, res)=> {
    //check your posted validations
    req.check('username', 'User Name is empty').notEmpty();

    req.check('email')
    .notEmpty().withMessage('Email is Empty')
    .isEmail().withMessage('Please give valid Email');

    req.check('password')
    .notEmpty().withMessage('Password can not be Empty')
    .isLength({min: 6}).withMessage('Please give at least 6 character long password');
    
    req.check('confirm_password', 'Password doesnot Match correctly').equals(req.body.password);
    // store all validation errors in a variable from request
    const errors = req.validationErrors();
    if(errors) {
        console.log(errors)
        res.render('index', {
            errors: errors
        });
    }
    else {
        res.render('index', {
           success: 'You are successfully registered. Please login'
        });
    }
});

app.listen(PORT, (req, res)=> {
    console.log('Start...Server is running successfully on port ' + PORT)
});