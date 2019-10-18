const http = require('http');
const myHost = 'localhost'; //127.0.0.1
const portNumber = 5000 || process.env.PORT;

// create a server with http
const server = http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    // response.end('My Server Works fine');
});

server.listen(portNumber, myHost, () => {
    console.log('My Server is running on port:' + portNumber + ' and HostName: ' + myHost);
});


