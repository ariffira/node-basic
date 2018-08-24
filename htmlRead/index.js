const http = require('http');
const fs = require('fs');
const myHost = 'localhost'; //127.0.0.1
const portNumber = 5000;

fs.readFile('htmlRead/index.html', (err, html) => {
    if (err) {
        throw err;
    }

    // create a server with http
    const server = http.createServer(function (request, response) {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.write(html);
        response.end('I am reading you Html');
    });

    server.listen(portNumber, myHost, () => {
        console.log('My Server is running on port:' + portNumber + ' and HostName: ' + myHost);
    });
});




