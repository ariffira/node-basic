const http = require('http');
const fs = require('fs');
const myHost = 'localhost'; //127.0.0.1
const portNumber = 5000;

// create a server with http
const server = http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/html'});

    // reading a file as Synchronous call
    // const fileData = fs.readFile('./htmlRead/index.html');

    // reading a file as Asynchronous call/ non blocking by a call back
    const fileData = fs.readFile('./htmlRead/index.html', (error, data) => {
        if (error) {
            throw error;
        }
        response.write(data);
        response.end('This is a non-blocking/asyn call....');
    });
    console.log(fileData);
});

server.listen(portNumber, myHost, () => {
    console.log('My Server is running on port:' + portNumber + ' and HostName: ' + myHost);
});


