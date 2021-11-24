const _ = require("lodash");
const mongoose = require("mongoose");
const Restaurant = require("../models/Restaurant");
const Cuisine = require("../models/Cuisine");
var faker = require("faker");
const axios = require('axios')

module.exports = {
    //routes GET /api/.../:endpoint, if query string, routes GET /api/.../:endpoint?name=raadaa&status=1
    index: (req, res, next) => {
        let noQuery = _.isEmpty(req.query);
        let builder = null;
            console.log(req.params.location)
        Restaurant.find({$or:[{types:  { $regex : ".*"+ req.params.location +".*", $options:'i' }},{formatted_address:  { $regex : ".*"+ req.params.location +".*", $options:'i' }},{name:  { $regex : ".*"+ req.params.location +".*", $options:'i' }}]})
        // .populate('faculty', { name: 1, _id: 1 })
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error => {
            res.json({
                message: 'An error occured!'
            })
        })
        

        // Restaurant.find(builder).sort({created_at: -1}).exec(function (err, result) {
        //     // Restaurant.find({slug: 'chinese'},function (err, result) {
        //     if(err)
        //         return res.send(err);
        //     return res.send({success: true, data: result, message: 'Restaurant retrieved successfully'});
        // })
        // const key = process.env.GOOGLE_API_KEY
        // const key = 'AIzaSyDMNS8cYGvzaL576kvcfqZWOG99DwmfJJE'
        // try {
        //     const location = 'ChIJ0ZRiCpULThAR5il_PZ2dSEM'
        //     const neighborhood = 'lagos'
        //     const borough = 'manhattan'
        //     const city = 'new+york+city'
        //     const category = 'chinesefood'
        //     const {data} = await axios.get(
            
        //  `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${category}&&hasNextPage=true&nextPage()=true&type=restaurant&key=${key}`
        //  `https://maps.googleapis.com/maps/api/place/details/json?place_id=${location}&type=restaurant&key=${key}`
        // `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${location}&inputtype=restaurant&key=${key}`
        //     )
        //     res.json(data)
        //     } 
        //   catch (err) {
        //    next(err)
        //  }
    },

    location: async (req, res, next) => {
            let noQuery = _.isEmpty(req.query);
            let builder = null;
                console.log(req.params.location)
            Restaurant.find({$or:[{types:  { $regex : ".*"+ req.params.location +".*", $options:'i' }},{formatted_address:  { $regex : ".*"+ req.params.location +".*", $options:'i' }},{name:  { $regex : ".*"+ req.params.location +".*", $options:'i' }}]})
            // .populate('faculty', { name: 1, _id: 1 })
            .then(response => {
                res.json({
                    response
                })
            })
            .catch(error => {
                res.json({
                    message: 'An error occured!'
                })
            })
    },
    cuisines: async (req, res, next) => {
        // let noQuery = _.isEmpty(req.query);
        // let builder = null;
        

        // Restaurant.find(builder).sort({created_at: -1}).exec(function (err, result) {
        //     if(err)
        //         return res.send(err);
        //     return res.send({success: true, data: result, message: 'Restaurant retrieved successfully'});
        // })
        // const key = process.env.GOOGLE_API_KEY
        const key = 'AIzaSyDMNS8cYGvzaL576kvcfqZWOG99DwmfJJE'
        try {
            
            const category = req.cuisine
            const {data} = await axios.get(
            
         `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${category}&type=restaurant&key=${key}`
        //  `https://maps.googleapis.com/maps/api/place/details/json?place_id=${location}&type=restaurant&key=${key}`
            )
            res.json(data)
            } 
          catch (err) {
           next(err)
         }
    },
    location_cuisines: async (req, res, next) => {
    
            let noQuery = _.isEmpty(req.query);
            let builder = null;
                console.log(req.params.location)
            Restaurant.find({$and:[{formatted_address:  { $regex : ".*"+ req.params.location +".*", $options:'i' }},{name:  { $regex : ".*"+ req.params.cuisine +".*", $options:'i' }}]})
            // .populate('faculty', { name: 1, _id: 1 })
            .then(response => {
                res.json({
                    response
                })
            })
            .catch(error => {
                res.json({
                    message: 'An error occured!'
                })
            })
    },
    //routes POST /api/.../:endpoint/:id
    store: (req, res) => {
        const restaurant = new Restaurant(req.body);
        restaurant.save().then(result => {
            return res.status(200).send({success: true, data: result, message: 'Restaurant saved successfully'});
        }).catch(err => {
            throw err;
        })
    },
    //routes GET /api/.../:endpoint/:id
    show: (req, res) => {
        Restaurant.findById(req.params.id).populate('user').exec((err, result) => {
            if (err)
                return res.send(err);
            return res.status(200).send({success: true, data: result, message: 'Restaurant retrieved successfully'});
        })
    },
    //routes PUT /api/.../:endpoint/:id
    update: (req, res) => {
        req.body.updated_at = new Date();
        Restaurant.findByIdAndUpdate(req.params.id, req.body, function (err, result) {
            if(err)
                return res.send(err);
            return res.status(200).send({success: true, data: result, message: 'Restaurant updated successfully'});

        })
    },
    //routes DELETE /api/.../:endpoint/:id
    destroy: (req, res) => {
        Restaurant.findByIdAndRemove(req.params.id, function (err, result) {
            if(err)
                res.send(err);
            return res.status(200).send({success: true, data: result, message: 'Actitvity deleted successfully'});
        })
    },
    seedRealRestaurant: async (req, res, next) => {
       
    //     let arr = [];
    // Location.find().exec((err, data) => {
    //     if (err) throw err;
    //     if(data.length > 0) {
    //         console.log('Location already seeded');
    //         return res.send({success: true, message: 'Location already seeded'});
    //     }else {

        const key = 'AIzaSyDMNS8cYGvzaL576kvcfqZWOG99DwmfJJE'
        try {
            const category = req.cuisine
            const location = req.location
            const {data} = await axios.get(
         `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${location}&type=restaurant&key=${key}`  
        //  `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${location}+${category}&type=restaurant&key=${key}`
        //  `https://maps.googleapis.com/maps/api/place/details/json?place_id=${location}&type=restaurant&key=${key}`
            )
            res.json(data)
            // populateData(res.json(data))
            } 
          catch (err) {
           next(err)
         }
         function populateData(data){
            console.log(data)   
         }
         
            // locations.forEach((req, index) => {
                
            //     Location.findOne({name: req.name })
            //     .then(response => { if(response != null) {
            //         console.log('Name Reference is already in use.')
            //         }
            
                
            //             console.log(req.name)
            //             let location = new Location ({
                            
            //                 name: req.name,
            //                 slug: req.slug,
                            
                        
            //             })
            //             location.save()
            //             .then(response => {        
                                        
                                            
            //                 console.log('Location added successfully!')
            //                 return res.send({success: true, message: 'Location seeded successfully!'});
                     
            //          })
            //          .catch(error => {
                         
            //              console.log('An error occured!' + error)
                     
            //          })
                        
            //         })
               
            // });
        // }
    // })

    },
    seedFakeRestaurant: (req, res, next) => {
        // let cuisines = [];

        let builder = null;
        

        Restaurant.find(builder).sort({created_at: -1}).exec(function (err, result) {
            if(err)
                return res.send(err);
            // return res.send({success: true, data: result, message: 'Cuisine retrieved successfully'});
            if(result.length >= 500){
                return res.send({success:true, message: 'Restuarants already seeded!'});
            }
            else{
                let cuisines = ['Chinese','French','Italian','Indian','Japanese','Moroccan','Spanish','Thai','Turkish','Indonesian'];

     
cuisines.forEach((restaurant, index) => {
    for (i = 0; i < 50; i++) {
        function getRandomString(length) {
            var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ_';
            var result = '';
            for ( var i = 0; i < length; i++ ) {
                result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
            }
            return result;
        }
        // Create Patient
        let randomString =  getRandomString(27);
        const req = {
            
                                place_id: `${randomString}`,
                                name: faker.company.companyName()+` ${restaurant} Restaurant` ,
                                business_status: "OPERATIONAL",
                                formatted_address: faker.address.streetName()+', '+faker.address.streetAddress()+', '+faker.address.cityName()+', '+faker.address.state()+ ', '+ faker.address.country(),
                                types: ['restaurant','food','point_of_interest', 'establishment'],
                                geometry: {location:{lat:faker.address.latitude(),lng:faker.address.longitude()}}
                              
                                
        
        };
        console.log(req)
        
        
         function store(req){
        
            Restaurant.findOne({place_id: req.place_id })
            .then(response => { if(response != null) {
                console.log('Restaurant already exist')
                console.log(req)
                }
        else{
                
                    console.log(req)
                    let restaurant = new Restaurant ({
                        
                        place_id: req.place_id,
                        name: req.name,
                        business_status: req.business_status,
                        formatted_address: req.formatted_address,
                        types: req.types,
                        geometry: req.geometry,
                        
                        
                    })
                    restaurant.save()
                    .then(response => {        
                                    
                                        
                        console.log('Restaurant seeded successfully!')
                 
                 })
                 .catch(error => {
                     
                     console.log('An error occured!' + error)
                 
                 })
                    
        }            
                
                })
            
        
            // })
        
            } 
            store(req);  
        }

})

    
    
    
                return res.send({success:true, message: 'Restaurant Seeded Successfully!',data: result});
               

            }
        
       
       
        
        })
            
            }
        //   return res.json(req) 


    }

