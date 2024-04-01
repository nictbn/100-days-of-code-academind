const express = require('express');
const router = express.Router();
const restaurantData = require('./../util/restaurant-data');
const uuid = require('uuid');

router.get('/restaurants', function(req, res) {
    const restaurants = restaurantData.getStoredRestaurants();
    let templateVariables = {
        numberOfRestaurants: restaurants.length,
        restaurants: restaurants
    };
    res.render('restaurants', templateVariables);
});

router.get('/restaurants/:id', function(req, res) {
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

router.get('/recommend', function(req, res) {
    res.render('recommend');
});

router.post('/recommend', function(req, res) {
    const restaurant = req.body;
    restaurant.id = uuid.v4();
    const restaurants = restaurantData.getStoredRestaurants();
    restaurants.push(restaurant);
    restaurantData.storeRestaurants(restaurants);
    res.redirect('/confirm');
});

router.get('/confirm', function(req, res) {
    res.render('confirm');
});

module.exports = router;