
const mongoose = require('mongoose');

let RestaurantSchema = new mongoose.Schema({
 place_id: String,  
 name: String,  
 business_status: String,  
 formatted_address: String,  
 types: Array, 
 geometry: {} 
    
},
{ strict: false }
);

module.exports = mongoose.model('Restaurant', RestaurantSchema);
