// app.js server code
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// include express handlebar module
const exphbs  = require('express-handlebars');
const path = require("path");

//file system
const fs = require('fs');
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./userData');

const multer = require('multer');
// setting storage
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'upload/')
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });
/*
const upload = multer({
    dest: 'upload/',
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});
*/

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

// file upload
/*app.post('/upload', upload.single('my-pic'), (req, res) => {
    // get temporary file path or destination
    const tempPath = req.file.path;
    console.log(tempPath) // check where file uploads

    // target path to upload with full path of server or localstorage
    const targetPath = path.join(__dirname, "upload/images");
    console.log(targetPath)

    //check uploaded file original name
    console.log(req.file.originalname)

    // check file extension name
    const uploadedFileExt = path.extname(req.file.originalname).toLowerCase();
    console.log(uploadedFileExt);

    // rename only jpg file else delete from temporary uploads/
    if (uploadedFileExt === '.jpg') {
        //rename file name using target path
        fs.rename(tempPath, targetPath, (err, res)=> {
            if (err) throw err;
            res.status(200);
            res.contentType("text/plain")
            res.end("File uploaded successfully........");
        });
    } else {
        fs.unlink(tempPath, err => {
            if (err) throw err;
            res.status(403);
            res.contentType("text/plain")
            res.end("Please upload only JPG file");
        });
    }

    res.redirect('/profile');
});*/


app.post('/upload', upload.single('my-pic'), function (req, res) {
   res.redirect('/profile');
})

// profile route
app.get('/profile', (req, res)=> {
    res.render('profile')
});

app.listen(3000, () => console.info('Application running on port 3000'));