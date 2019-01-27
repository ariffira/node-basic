const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require("path");
const uploadController = require('../controller/upload');
/**
 * multer: is a middleware or js library
 * which can take multipart form data like image, pdf,doc
 */
const multer = require("multer");
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

// file upload single file
router.post('/pic_upload', upload.single('profile_pic'), uploadController.profile_pic_upload);

// profile route after upload image
router.get('/profile/:imageName', uploadController.profile_page);

// file upload gallery for multiple
router.all('/pics_upload', upload.array('all_pic'), uploadController.upload_many);

router.all('/pdf_upload',  upload.single('myPdf'), uploadController.upload_pdf);

module.exports = router;