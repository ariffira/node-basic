// include a build in module
var httpModule = require('http');

// include my module
var myModuleData = require('./myModule');
var dateModule = require('./dateModule');
var fileModule = require('./fileModule');

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
    //First module
    response.write('Data from my module:<h1>' + myModuleData.myModule() + '</h1>');
    response.write('<h1>My Name as String: ' + myModuleData.myName + '</h1>');

    // date module
    response.write('Data from Date module:<h1>' +  dateModule.dateTime() + '</h1>');

    // check url after localhost
    response.write('<h2>The Url I am using is ' + request.url + '</h2>');

    // Create/Add a file
    response.write(fileModule.fileCreate());

    // Read file
    response.write(fileModule.fileUpdate());

    // Rename file
    //response.write(fileModule.fileRename());

    // Delete File
    // response.write(fileModule.fileDelete());

    //end function on streams body
    response.end('I imported module. Created by Me . Hurrah!!!');
    console.log('This file running on port:' + portNumber);
});

server.listen(portNumber);


