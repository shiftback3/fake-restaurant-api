const express = require("express");
const restaurantController = require("../controllers/restaurant.controller");
const locationController = require("../controllers/location.controller");
const cuisineController = require("../controllers/cuisine.controller");
const bookingController = require("../controllers/booking.controller");
const route = express.Router();

// route.get('/', restaurantController.index);
route.get('/search/:location', restaurantController.index);
// route.get('/{cuisine}', restaurantController.cuisines);
route.get('/search/:location/:cuisine', restaurantController.location_cuisines);
route.get('/seed/location/', locationController.index);
route.get('/seed/cuisine', cuisineController.index);
route.post('/seeder/location', locationController.seedLocation);
route.post('/seeder/cuisine', cuisineController.seedCuisine);
route.post('/restaurant/live/:location', restaurantController.seedRealRestaurant);
route.post('/restaurant/fake', restaurantController.seedFakeRestaurant);
route.get('/restaurant/booking', bookingController.index);
route.post('/restaurant/booking', bookingController.store);

module.exports ={route}