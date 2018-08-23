// include a build in module
var httpModule = require('http');
var portNumber = 3000;

// create a server with httpModule
httpModule.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end('Hello Node JS. How are You?');
    console.log('My First Node js file running on port:' + portNumber);
}).listen(portNumber);


