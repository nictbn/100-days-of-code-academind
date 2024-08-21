const express = require('express');

const db = require('./data/database');
const quoteRoutes = require('./routers/quotes.route');

const app = express();

app.use('/quotes', quoteRoutes);

app.use(function(error, req, res, next) {
    res.status(500).json({
        message: 'Something went wrong!',
    })
});

db.initDb().then(function() {
    app.listen(3000); 
}).catch(function(error) {
    console.log('Could not start the app!');
    console.log(error);
});