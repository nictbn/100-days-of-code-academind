const path = require('path');

const express = require('express');
const uuid = require('uuid');

const restaurantData = require('./util/restaurant-data');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(express.urlencoded({extended: false}));

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/restaurants', function(req, res) {
    const restaurants = restaurantData.getStoredRestaurants();
    let templateVariables = {
        numberOfRestaurants: restaurants.length,
        restaurants: restaurants
    };
    res.render('restaurants', templateVariables);
});

app.get('/restaurants/:id', function(req, res) {
    const restaurantId = req.params.id;
    const restaurants = restaurantData.getStoredRestaurants();
    let foundRestaurant = undefined;
    for (const restaurant of restaurants) {
        if (restaurant.id === restaurantId) {
            foundRestaurant = restaurant;
            break;
        }
    }
    if (foundRestaurant === undefined) {
        return res.status(404).render('404');  
    }
    return res.render('restaurant-detail', {restaurant: foundRestaurant});
});

app.get('/recommend', function(req, res) {
    res.render('recommend');
});

app.post('/recommend', function(req, res) {
    const restaurant = req.body;
    restaurant.id = uuid.v4();
    const restaurants = restaurantData.getStoredRestaurants();
    restaurants.push(restaurant);
    restaurantData.storeRestaurants(restaurants);
    res.redirect('/confirm');
});

app.get('/confirm', function(req, res) {
    res.render('confirm');
});

app.get('/about', function(req, res) {
    res.render('about');
});


// it's important that this 404 middleware is at the bottom of the page
app.use(function(req, res) {
    res.status(404).render('404');
});

app.use(function(error, req, res, next) {
    res.status(500).render('500');
});


app.listen(3000);