const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const path = require("path");
const fs = require('fs');
/**
 * multer: is a middleware or js library
 * which can take multipart form data like image, pdf,doc
 */
const multer = require("multer");

// set the template engine views
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'hbs')

// set public folder for static files css, images
app.use(express.static(__dirname + '/public'));

/* //Basic multer test by dest option
const upload = multer({
    dest: 'public/upload/images'
}); */

// setting multer storage by storage option
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

// routes
app.get('/', (req, res)=> {
   res.render('profile');
});

// file upload single
app.post('/pic_upload', upload.single('profile_pic'), (req, res) => {
    // get temporary file path or destination
    const imageName = req.file.filename;
    console.log(req.file);
    // check file extension name from original filename and convert to lowercase
    const uploadedFileExt = path.extname(req.file.originalname).toLowerCase();

    // upload only jpg/png file else delete from temporary path 
    if ((uploadedFileExt == '.jpg') || (uploadedFileExt == '.png')) {
        res.redirect('/profile/' + imageName);
    } else {
        // if not jpg/png remove file and give a message
        const imagePath = req.file.path;
        fs.unlink(imagePath, err => {
            if (err) throw err;
            res.status(403);
            res.contentType("text/plain")
            res.end("Please upload only JPG or PNG file");
        });
    }    
});

// profile route after upload image
app.get('/profile/:imageName', (req, res)=> {
  //image path without public as its static name not needed here
  const imagePath = '/upload/images/' + req.params.imageName;
  console.log(imagePath);
  res.render('profile', { imagePath: imagePath });
});

// file upload gallery for multiple
app.all('/pics_upload', upload.array('all_pic', 3), (req, res) => {
    let fileArray = req.files;
    res.render('gallery', {
        images: fileArray
    });
});

app.listen(PORT, ()=> {
    console.log("Server is running on port number" + PORT);
});