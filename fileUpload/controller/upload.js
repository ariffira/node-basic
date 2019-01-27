const path = require("path");

// single picture upload
exports.profile_pic_upload = (req, res) => {
    // get temporary file path or destination
    const imageName = req.file.filename;
    console.log(req.file);
    // check file extension name from original filename and convert to lowercase
    const uploadedFileExt = path.extname(req.file.originalname).toLowerCase();

    // upload only jpg/png file else delete from temporary path 
    if ((uploadedFileExt == '.jpg') || (uploadedFileExt == '.png')) {
        res.redirect('/upload/profile/' + imageName);
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
}

// profile page controller after upload single picture
exports.profile_page = (req, res)=> {
    //image path without public as its static name not needed here
    const imagePath = '/upload/images/' + req.params.imageName;
    console.log(imagePath);
    res.render('profile', { imagePath: imagePath });
}

// upload multiple files
exports.upload_many = (req, res) => {
    let fileArray = req.files;
    res.render('gallery', {
        images: fileArray
    });
}

// upload pdf file only
exports.upload_pdf = (req, res) => {
    const fileExtension = path.extname(req.file.originalname);
    const pdfFile = '/upload/images/' + req.file.filename;
    //console.log(fileExtension);
    if(fileExtension =='.pdf') {
        res.render('profile', {
            pdfFile: pdfFile
        });
    }
    else {
        const pdfPath = req.file.path;
        fs.unlink(pdfPath, err => {
            if(err) throw err;
            res.send('wrong file! please upload pdf file');
        });
    }
}



