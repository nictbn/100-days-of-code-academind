const path = require('path');
const { ObjectId } = require('mongodb');

const express = require('express');
const session = require('express-session');
const mongodbStore = require('connect-mongodb-session')

const db = require('./data/database');
const demoRoutes = require('./routes/demo');

const MongoDBStore = mongodbStore(session);

const app = express();

const sessionStore = new MongoDBStore({
  uri: 'mongodb://topsecretuser:topsecretpass@127.0.0.1:27017/',
  databaseName: 'auth-demo',
  collection: 'sessions'
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: 'super-secret-session-key',
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000
  }
}));

app.use(async function(req, res, next) {
  const isAuth = req.session.isAuthenticated;
  const user = req.session.user;
  
  if (!user || !isAuth) {
    return next();
  }
  const userDoc = await db.getDb().collection('users').findOne({_id: ObjectId.createFromHexString(user.id)});
  const isAdmin = userDoc.isAdmin;

  res.locals.isAuth = isAuth;
  res.locals.isAdmin = isAdmin;
  next();
})

app.use(demoRoutes);

app.use(function(error, req, res, next) {
  res.render('500');
})

db.connectToDatabase().then(db.initializeAdminUser).then(function () {
  app.listen(3000);
});
