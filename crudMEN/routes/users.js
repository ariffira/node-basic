var express = require('express');
var router = express.Router();
const User = require('../models/user');


/* GET users list */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
    var query = User.find();
    query.exec(function (err, result) {
        if(err) throw err;
        res.render('user', { user: result });
    });
});

module.exports = router;
