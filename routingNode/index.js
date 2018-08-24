var http = require('http');
var url = require('url');
var fileRead = require('./fileRead');

const myHost = 'localhost'; //127.0.0.1
const portNumber = 5000;

// create a server with http
const server = http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/html'});

    var path = url.parse(request.url).pathname;

    // routes
    switch (path) {
        case '/':
            fileRead.fileRead('routingNode/home.html', response);
            break;
        case '/aboutus':
            fileRead.fileRead('routingNode/aboutUs.html', response);
            break;
        default:
            response.writeHead(404);
            response.write('Route not defined');
            response.end();
    }

});

server.listen(portNumber, myHost, () => {
    console.log('My Server is running on port:' + portNumber + ' and HostName: ' + myHost);
});