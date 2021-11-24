
const mongoose = require('mongoose');

let LocationSchema = new mongoose.Schema({
   
    
},
{ strict: false }
);

module.exports = mongoose.model('Location', LocationSchema);
