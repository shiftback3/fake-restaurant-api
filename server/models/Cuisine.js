
const mongoose = require('mongoose');

let CuisineSchema = new mongoose.Schema({
   
    
},
{ strict: false }
);

module.exports = mongoose.model('Cuisine', CuisineSchema);
