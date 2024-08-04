const mongodb = require('mongodb');
const bcrypt = require('bcryptjs');

const MongoClient = mongodb.MongoClient;

let database;

async function connectToDatabase() {
  const client = await MongoClient.connect(
    'mongodb://topsecretuser:topsecretpass@127.0.0.1:27017/'
  );
  database = client.db('auth-demo');
}

function getDb() {
  if (!database) {
    throw { message: 'You must connect first!' };
  }
  return database;
}

async function initializeAdminUser() {
  if (await database.collection('users').count() === 0 ) {
    console.log('Creating admin user')
    const enteredPassword = 'topsecret' // just for demo purposes
    const hashedPassword = await bcrypt.hash(enteredPassword, 12);
    await database.collection('users').insertOne({email: 'admin@test.com', password: hashedPassword, isAdmin: true});
  } else {
    console.log('The db has users already, will not add an admin user');
  }
}

module.exports = {
  connectToDatabase: connectToDatabase,
  getDb: getDb,
  initializeAdminUser: initializeAdminUser,
};
