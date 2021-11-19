
const mongoose = require('mongoose');

let RestaurantSchema = new mongoose.Schema({
   
    
},
{ strict: false }
);

module.exports = mongoose.model('Restaurant', RestaurantSchema);
