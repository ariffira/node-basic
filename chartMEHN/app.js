const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const indexRouter = require('./routes/index');

// connecting database
mongoose.connect('mongodb://localhost/mychart');
/* mongoose.connect('Your mlab link').then(()=>{
    console.log('...Database is connected')
}).catch(()=>{
    console.log('...not connected. Please check connection.')
}); */

// set the template engine views
app.set('view engine', 'hbs');

// set public folder for static files css, images
app.use(express.static(__dirname + '/public'));
//routes
app.use('', indexRouter);
// any routes accepted for error handling
app.get('*', (req, res)=> {
    res.send('404, wrong place. please go to right path')
});

app.listen(PORT, ()=> {
    console.log('Start...Server is running successfully on port ' + PORT)
});