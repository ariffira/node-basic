const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const indexController = require('./controller/indexController');

app.get('/', (req, res)=> {
  res.send(indexController.getMyData());
  //res.send('My name Arif and I am 31 years');
});

app.listen(PORT, (req, res)=> {
    console.log('Start...Server is running successfully on port ' + PORT)
});