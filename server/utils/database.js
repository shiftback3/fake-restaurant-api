const mongoose = require("mongoose");



// const { NODE_ENV, DEV_DB } = process.env;

// const options = {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true,
// };

// mongoose
//     .connect(DEV_DB, options)
//     .then(() => {
//         console.log("database successfully connected");
//     })
//     .catch((err) => {
//         console.log("database connection failed");
//         console.log(err);
//     });


    if(process.env.NODE_ENV === 'production'){
        // mongoose.connect('mongodb+srv://staff_mgt_user:<password>@cluster0.co1mx.mongodb.net/restaurantapp?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
  
        mongoose.connect('mongodb+srv://surmount:Dimeji22@raadaa.5gczk.mongodb.net/restaurant?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
    }else{
        // config();
        require('dotenv').config();
        mongoose.connect('mongodb://127.0.0.1:27017/restaurant-app', { useNewUrlParser: true, useUnifiedTopology: true })
    }
    
    
    
    
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    
    const db = mongoose.connection
    
    db.on('error', (err) => {
        console.log(err);
    })
    
    db.once('open', () => {
        console.log('Database Connection Established!');
    }) 
