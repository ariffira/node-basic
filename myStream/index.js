const http = require('http');
const myHost = 'localhost'; //127.0.0.1
const portNumber = 5000;

// include readStream Module to read stream
var readStream = require('./readStream');


// create a server with http
const server = http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write('Read Stream works fine!!!');
    readStream();
});

server.listen(portNumber, myHost, () => {
    console.log('My Server is running on port:' + portNumber + ' and HostName: ' + myHost);
});