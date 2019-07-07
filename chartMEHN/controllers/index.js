const express = require('express');
// all your controller functions will be here
const Chart = require('chart.js');

exports.getIndex = (req, res)=>{
    res.render('index');
}


