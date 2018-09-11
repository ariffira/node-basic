const express = require('express')
const app = express()

// first middleware to display simple message when load the page
var myLogMessage = function (req, res, next) {
    console.log('Middleware Activated when server load!')
    next()
}

app.use(myLogMessage)

// 2nd middleware to display current time
var currentTime = function (req, res, next) {
    req.timeNow = new Date(Date.now()).toLocaleString();
    next()
}

app.use(currentTime)

app.get('/', function (req, res) {
    var pageContent = 'My Middleware work very fine. It is loaded...!<br>'
    pageContent += '<h1>Requested at: ' + req.timeNow + '</h1>'
    res.send(pageContent)
})

app.listen(3000, function() {
    console.log("This File running on port 3000")
})