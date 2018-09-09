// this is our chat server
// include all necessary files here
const express = require("express")
const path = require("path")
const app = express()
// include express handlebar module
var exphbs  = require('express-handlebars');

// define port number for server
const SERVER_PORT_NUMBER = 5000

// This is config for render view in `views` folder
// and use handlebars as template engine here
app.set('views', path.join(__dirname, 'views'))

// setting default page layouts which is under views/layouts/index.handlebars and view engine as handlebarjs
app.engine('handlebars', exphbs({defaultLayout: 'index'}));
app.set('view engine', 'handlebars')

// home routes
app.get('/', (request, response) => {
    let pageTitle = "home page"
    response.render('home', {pageTitle});
})

// chat routes
app.get('/chat', (request, response) => {
    let pageTitle = "Chat page"
    response.render('chat', {pageTitle});
})

const server = app.listen(SERVER_PORT_NUMBER, () => {
    console.log(`My simple Chat App running on port Number ${SERVER_PORT_NUMBER}`)
})

// include socket io for ther server
const io = require('socket.io').listen(server)

io.on('connection', function (socket) {
    console.log('a user is connected...');
    // receive messages from chatMSg event of client
    socket.on('chatMsg', function(message) {
        console.log('Received Message is : ' + message);
        // broadcasting the message to all connected users of chatMsg event
        io.emit('chatMsg', message);
    });
});
