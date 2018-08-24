const fs = require('fs');

function fileRead(path, response) {
    fs.readFile(path, (err, file) => {
        if (err) {
            response.writeHead(404);
            response.write('File not found!');
        }
        else {
            response.write(file);
        }
        response.end();
    });
}

module.exports.fileRead = fileRead;