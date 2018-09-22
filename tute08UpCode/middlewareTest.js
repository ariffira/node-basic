const express = require("express");
const app = express();

// first middleware give a log message every time i load the file
let myLogMessage = function(req, res, next) {
  console.log('Before laugh cry few minutes....')
  next()
}

// second middleware show
let timeNow = function(req, res, next) {
  req.currentTime = new Date(Date.now()).toLocaleString();
  next();
}

//third middleware

// using first middleware
app.use(myLogMessage);
// use second middleware
app.use(timeNow);

// routes
app.get('/beslan', function(req, res){
   res.send('<h1>Beslan is laughing...... at: </h1> Response time' + req.currentTime)
});

// server listen
app.listen(5000, ()=> {
  console.log("I am running middleware on port 5000")
});