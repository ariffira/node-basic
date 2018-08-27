const fs = require("fs");
var somedata = '';

function readStream() {
    // Create a readable stream
    const readerStream = fs.createReadStream('myStream/file.txt');

    // Set the encoding to be utf8.
    readerStream.setEncoding('UTF8');

    // Handle stream events --> data, end, and error
    readerStream.on('data', function(chunk) {
        somedata += chunk;
    });

    readerStream.on('end',function(){
        console.log(somedata);
    });

    readerStream.on('error', function(err){
        console.log(err);
    });
    console.log("Successfully read the streaming data from file.txt..............");
}

module.exports = readStream;
