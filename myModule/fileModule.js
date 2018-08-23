var fs = require('fs');

const fileData = 'This is my First File system module Data';

exports.fileCreate = function () {
    fs.appendFile('files/myFirstFile.txt', fileData, function (err) {
        if (err) throw err;
        console.log('Created File.......');
    });
    return '<h2>File created........Cool</h2>';
};

exports.fileUpdate = function () {
    fs.writeFile('files/myFirstFile.txt', 'I updates previous text by This', function (err) {
        if (err) throw err;
        console.log('Updates..........!');
    });
    return '<h2>File is Updated now</h2>';
};

exports.fileRename = function () {
    fs.rename('files/myFirstFile.txt', 'files/myRenamedFile.txt', function (err) {
        if (err) throw err;
        console.log('File Renamed........');
    });
    return '<h2>File is renamed</h2>';
};

exports.fileDelete = function () {
    setTimeout(function() {
        fs.unlink('files/myFirstFile.txt', function (err) {
            if (err) throw err;
            console.log('deleted');
        });
    }, 5000);
    return '<h2>File is deleted</h2>';
};