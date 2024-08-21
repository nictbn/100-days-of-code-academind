const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let database;

async function initDb() {
    const client = await MongoClient.connect('mongodb://topsecretuser:topsecretpass@127.0.0.1:27017/');
    database = client.db('first-api');
    if (await database.collection('quotes').count() === 0) {
        console.log('Quotes collection is empty! initializing collection');
        await database.collection('quotes').insertMany([{text: 'Learning never stops'}, {text: 'Lorem ipsum'}, {text: 'Dolor sit'}, {text: 'Amet'}]);
        console.log('Quotes collection initialized successfully');
    }
}

function getDb() {
    if (!database) {
        throw new Error('Database not connected!');
    }
    return database;
}

module.exports = {
    initDb: initDb,
    getDb: getDb,
}