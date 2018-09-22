const express = require("express");
const app = express();
const PORT = 5001;
const bodyParser = require("body-parser");
const expHbs = require("express-handlebars");
const path = require("path");
const fs = require("fs");
const nodemailer = require("nodemailer");
// add mongoose package
const mongoose = require('mongoose');
/* 
  multer: is a middleware or js library which can take multipart form data like image, pdf,doc
 */
const multer = require("multer");
// setting multer storage
const storage = multer.diskStorage({
  // destination is where we upload our file
  destination: function(req, file, callback) {
    // callback(param1, param2) as multer docs says
    callback(null, 'public/upload/images');
  },
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
const upload = multer({ storage: storage });
// local storage setup
const LocalStorage = require("node-localstorage").LocalStorage;
const localStorage = new LocalStorage('./userData');

const bcrypt = require('bcryptjs');

// connect mongoose using localhost
mongoose.connect('mongodb://localhost/tute11');

// set the template engine views
app.set('views', path.join(__dirname + '/views'));
// set public folder for static files css, images
app.use(express.static(__dirname + '/public'));

// set template engine
app.engine('handlebars', expHbs({ defaultLayout: 'index' }));
app.set('view engine', 'handlebars')

// using body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// routes to get index html 
app.get('/', (req, res)=> {
  //res.sendFile(__dirname + '/index.html');
  //let title = "Landing Page";
  res.render('landing', { 
    pageTitle: "Landing page"
  });
});

// get registration, only show form
app.get('/registration', (req, res)=> {
  res.render('registration', { pageTitle: "Registration page"});
});

/*// posting resgitration form data to save in localstorage
app.post('/registration', (req, res) => {
  let postData = req.body;
  console.log(postData);
  // save data to local storage
  localStorage.setItem('user', JSON.stringify(postData));
  res.redirect('/signin');
});*/

// add model user
const User = require('./models/user');

// posting resgitration form data to save in MongoDB
app.post('/registration', (req, res) => {
    let postData = req.body;
    console.log(postData);
    // create a new user object as like your user schema
    let newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        createdAt: Date.now()
    });

/*    // Save the user to database
    newUser.save(err => {
        if(err) throw err;
        console.log('A new User Saved to Database!');
    });*/

    // Save user data using bcryptjs
    const saltRounds = 5;
    // encrypt password first using salt
    bcrypt.hash(newUser.password, saltRounds, (err, hash) => {
        if(err) throw err;
        // make hash as your new password
        newUser.password = hash;
        // save all data to DB now
        newUser.save(err => {
            if(err) throw err;
            console.log('A new User Saved to Database using Hash!');
        });
    });
    res.redirect('/signin');
});

// show sign in form
app.get('/signin', (req, res)=> {
  res.render('signin', { pageTitle: "Sign-in page"});
});

// post signin data and give access
app.post('/signin', (req, res)=> {
  let postData = req.body;
  console.log(postData.email);
  let emailFromBody = postData.email;
  let passFromBody = postData.password;
  // get data from storage
  const userDataFromStore = JSON.parse(localStorage.getItem('user'));
  let firstname = userDataFromStore.firstname;
  console.log(userDataFromStore.email);
  let emailFromDB = userDataFromStore.email;
  let passFromDB = userDataFromStore.password;
  if((emailFromBody == emailFromDB) && (passFromBody === passFromDB)){
    res.redirect('/upload');
  }
  else {
    // let errorMessage = "404";
    res.redirect('/signin');
  }
});

// upload image form 
app.get('/upload', (req, res) => {
  res.render('uploadImage');
});

// upload image form when has message
app.get('/upload/:message', (req, res) => {
  res.render('uploadImage', { 
    message: req.params.message
  });
});

// post image to upload
app.post('/upload', upload.single('my-pic'), (req, res) => {
   const imageName = req.file.filename; 
   console.log(imageName);
   //check file extension and convert it to lowercase
   const fileExtension = path.extname(imageName).toLowerCase();
   console.log(fileExtension);

   if(fileExtension =='.jpg' || fileExtension =='.png') {
    res.redirect('/homepage/' + imageName);
   }
   else {
     var imagePath = req.file.path;
     fs.unlink(imagePath, err => {
        if(err) throw err;
        let message = "Wrong type of file. please upload an Image file!"
        res.redirect('/upload/' + message);
     });
   }
});


// homepage routes
app.get('/homepage/:image', (req, res) => {
  var imagePath = "/upload/images/" + req.params.image;
  console.log(imagePath);
  //var imagePath = tempPath.replace(/public/i, '');
  res.render('homepage', { 
    pageTitle: "Home page",
    imagePath: imagePath
  });
})

// contact form routes
app.get('/contact', (req, res) => {
   //res.send('heloo contact')
   res.render('contactForm');
});

// send email to contact
app.post('/sendEmail', (req, res) => {
   // setup email tranporter(it is postman)
   let transporter = nodemailer.createTransport({
     service: 'gmail', //like deutsche post
     auth: {
       user: 'test.purpose.mai@gmail.com', //your email
       pass: '@r1ful2018' //your password of email address
     }
   });
   console.log(req.body);
   // configure email details
   const mailOptions = {
      from: req.body.emailFrom, //sender address
      to: 'test.purpose.mai@gmail.com', //receiver address
      subject: req.body.emailSubject, // email subject
      html: "<h1 style='color: blue'>" + req.body.emailBody + "</h1>" //email body or messages
   };

   // send email now
   transporter.sendMail(mailOptions, (err, info)=> {
     if(err) {
       console.log(err);
     } else {
       console.log(info);
       res.send('email send successfully......!');
     }
   });
});

app.listen(PORT, ()=> {
  console.log("Server is running on port number" + PORT);
});