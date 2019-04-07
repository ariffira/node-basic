const express = require('express');
// index page
exports.getIndex = (req, res)=> {
    res.render('index', {
        pageTitle: 'this is düsseldorf'
    });
}

// user list controller
exports.getUsers = (req, res)=> {
    res.send('its works');
}

// get user by id
exports.getUserById = (req, res)=> {
    res.send(req.params.id); //12121
}

// get user by email and id
exports.getUserByEmailId =  (req, res)=> {
    res.send(req.params.email + req.params.id);
}


