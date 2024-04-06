const fs = require('fs/promises');

function readFile() {
    // let fileData;
    // fs.readFile('data.txt', function(error, fileData) {
    //     console.log(fileData.toString());
    //     console.log('File parsing done!');
    // });
    // console.log('Hi there');

    let fileData;
    fs.readFile('data.txt').then(function(fileData) {
        console.log(fileData.toString());
        console.log('File parsing done!');
        // return anotherAsyncOperation;
    });
    // .then(function() {});
    console.log('Hi there');
}

readFile();