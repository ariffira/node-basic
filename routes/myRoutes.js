var express = require('express');
var router = express.Router();

// Contact routes
router.get('/contact', function(req, res){
    // res.sendFile('index.html', { root: 'views/'});
    res.render('index.html');
});

// dashboard routes
router.get('/dashboard', function (req, res) {
    res.send("<h1>Dashboard Page</h1>");
});

module.exports = router;
