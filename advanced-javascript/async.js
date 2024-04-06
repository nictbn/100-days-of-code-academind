const fs = require('fs/promises');

// async added for the async await version of this function
async function readFile() {
    // callback example
    // let fileData;
    // fs.readFile('data.txt', function(error, fileData) {
    //        if (error) {
    //          // ...
    //        }
    //     console.log(fileData.toString());
    //     console.log('File parsing done!');
    // });
    // console.log('Hi there');

    // promise example
    // let fileData;
    // fs.readFile('data.txt').then(function(fileData) {
    //     console.log(fileData.toString());
    //     console.log('File parsing done!');
    //     // return anotherAsyncOperation;
    // })
    // // .then(function() {});
    // .catch(function (error) {
    //     console.log(error);
    // })
    // console.log('Hi there');

    // async await example
    let fileData;
    try {
        fileData = await fs.readFile('data.txt');
    } catch (error) {
        console.log(error);
    }
    console.log(fileData.toString());
    console.log('File parsing done!');
    console.log('Hi there');
}

readFile();