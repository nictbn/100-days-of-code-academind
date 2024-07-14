const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let database;

async function connect() {
    const client = await MongoClient.connect('mongodb://topsecretuser:topsecretpass@127.0.0.1:27017/');
    database = client.db('blog');   
}

async function initializeAuthors() {
    if (!database) {
        throw { message: 'Database connection not established!'};
    }
    if (await database.collection('authors').count() > 0) {
        console.log('Authors already initialized!');
        return
    }
    console.log('Initializing authors!');
    let newAuthor = {
        name: 'Maximilian Schwarzmueller',
        email: 'max@test.com'
    }
    await database.collection('authors').insertOne(newAuthor);
    newAuthor = {
        name: 'Manuel Lorenz',
        email: 'manuel@test.com'
    }
    await database.collection('authors').insertOne(newAuthor);
}

function getDb() {
    if (!database) {
        throw { message: 'Database connection not established!'};
    }
    return database;
}

module.exports = {
    connectToDatabase: connect,
    initializeAuthors: initializeAuthors,
    getDb: getDb
}
