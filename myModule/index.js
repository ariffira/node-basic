// include a build in module
var httpModule = require('http');
// include my module
var myModuleData = require('./myModule');
var dateModule = require('./dateModule');

var portNumber = 3000;

// create a server with httpModule
const server = httpModule.createServer(function (request, response) {
    //setting header
    // 200 is statusCode 'ok' if no error
    response.writeHead(200, {
        'Content-Type': 'text/html'
    });
    // setting body
    //sending response body data as Stream Body
    response.write('Data from my module:<h1>' + myModuleData.myModule() + '</h1>');
    response.write('Data from Date module:<h1>' + dateModule.dateTime() + '</h1>');
    response.write('<h2>The Url I am using is ' + request.url + '</h2>');
    //end function on streams body
    response.end('I imported my new module. Created by Me . Hurrah!!!');
    console.log('This file running on port:' + portNumber);
});

server.listen(portNumber);


