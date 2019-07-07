const express = require('express');
// index page
exports.getIndex = (req, res)=> {
    res.render('index', {
        pageTitle: 'this is düsseldorf'
    });
}

