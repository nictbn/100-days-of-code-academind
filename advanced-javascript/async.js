const fs = require('fs');

function readFile() {
    let fileData;
    fs.readFile('data.txt', function(error, fileData) {
        console.log(fileData.toString());
        console.log('File parsing done!');
    });
    console.log('Hi there')
}

readFile();