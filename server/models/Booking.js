
const mongoose = require('mongoose');

let BookingSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    guest: String,
    date: String,
    time: String,
    restaurant_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant'},   
    
},
{ strict: false }
);

module.exports = mongoose.model('Booking', BookingSchema);
