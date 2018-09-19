// app.js server code
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// include express handlebar module
const exphbs  = require('express-handlebars');
const path = require("path");

//nodemailer includes
const nodemailer = require("nodemailer");

//file system
const fs = require('fs');
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./userData');

const multer = require('multer');
// multer setting storage
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'public/upload/images')
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname)
    },
/*    //A means of ensuring only images are uploaded.
    fileFilter: function(req, file, next){
        if(!file){
            next();
        }
        const image = file.mimetype.startsWith('image/');
        if(image){
            console.log('photo uploaded');
            next(null, true);
        }else{
            console.log("file not supported");
            return next();
        }
    }*/
});

const upload = multer({ storage: storage });

// set uploads folder
app.use(express.static(__dirname + '/public'));

// This is config for render view in `views` folder
// and use handlebars as template engine here
app.set('views', path.join(__dirname, 'views'))

// setting default page layouts which is under views/layouts/index.handlebars and view engine as handlebarjs
app.engine('handlebars', exphbs({defaultLayout: 'index'}));
app.set('view engine', 'handlebars')

// urlencoded for form data, parsing application/x-www-form-urlencoded
// if extended true any data can post, if false nested object can not post
app.use(bodyParser.urlencoded({ extended: true }));

// initial page route
app.get('/', (req, res) => {
    res.render('registration') // render registration form
})

// registration  page route
app.get('/register', (req, res) => {
    res.render('registration') // render registration form
});

// post registration form route
app.post('/register', (req, res) => {
    const postData = req.body;
    console.log(postData);
    localStorage.setItem('user', JSON.stringify(postData));
    res.redirect('/signin');
});

// signin  page route
app.get('/signin', (req, res) => {
    res.render('signin') // render signin form
});

// post signin data routes
app.post('/signin', (req, res)=> {
    let postData = req.body;
    console.log(postData.email);
    // get data from local storage
    let userFromStore = JSON.parse(localStorage.getItem('user'));
    console.log(userFromStore.email);
    // check user access
    if (postData.email == userFromStore.email) {
        res.redirect('/home');
    } else {
        console.log('Wrong email! Please give right one')
        res.redirect('/signin');
    }
});

// homepage routes after login
app.get('/home', (req, res)=> {
    res.render('home')
});

// file upload routes
app.post('/upload', upload.single('my-pic'), (req, res) => {
    // get temporary file path or destination
    const tempPath = req.file.path;
    // that has to add localstorage or database as profile image

    console.log(tempPath) // check where file uploads

/*    // target path to upload with full path of server or localstorage
    const targetPath = path.join(__dirname, "public/upload/images");
    console.log(targetPath)*/

    //check uploaded file original name
    //console.log(req.file.originalname)

    // check file extension name
    const uploadedFileExt = path.extname(req.file.originalname).toLowerCase();
    // console.log(uploadedFileExt);

    // rename only jpg file else delete from temporary uploads/
    if ((uploadedFileExt !== '.jpg') || (uploadedFileExt !== '.png')) {
        res.redirect('/profile/' + tempPath);
    } else {
        // if not jpg remove file and give a message
        fs.unlink(tempPath, err => {
            if (err) throw err;
            res.status(403);
            res.contentType("text/plain")
            res.end("Please upload only JPG or PNG file");
        });
    }
});

// profile route
app.get('/profile/:image', (req, res)=> {
    var tempPath =  req.params.image;
    var imagePath = tempPath.replace(/public/i, '');
    console.log(imagePath);
    res.render('profile', { imagePath: imagePath });
});

// setup transport service for your email service
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'test.purpose.mai@gmail.com',
        pass: '@r1ful2018'
    }
});

//configure email details
const mailOptions = {
    from: 'test.purpose.mai@gmail.com', // sender address
    to: 'mac.fira@gmail.com', // list of receivers
    subject: 'Nodemailer test Ariful', // Subject line
    html: '<p>Hello ariful....</p>'// plain text body
};

// send email onclick button
app.get('/sendMail', (req, res) => {
    transporter.sendMail(mailOptions, function (err, info) {
        if(err)
            console.log(err)
        else
            console.log(info);
    });
    res.send('Email sent')
});

app.listen(3000, () => console.info('Application running on port 3000'));