const _ = require("lodash");
const mongoose = require("mongoose");
const Cuisine = require("../models/Cuisine");


const cuisines = [
    { "name": "Chinese Cuisine", "slug": "Chinese"  },
    { "name": "French Cuisine", "slug": "French"  },
    { "name": "Italian Cuisine", "slug": "Italian" },
    { "name": "Indian Cuisine", "slug": "Indian"  },
    { "name": "Japanese Cuisine", "slug": "Japanese"  },
    { "name": "Moroccan Cuisine", "slug": "Moroccan"  },
    { "name": "Spanish Cuisine", "slug": "Spanish"  },
    { "name": "Thai Cuisine", "slug": "Thai"  },
    { "name": "Turkish Cuisine", "slug": "Turkish"  },
    { "name": "Indonesian Cuisine", "slug": "Indonesian"  },
    
   
];

module.exports = {
    //routes GET /api/.../:endpoint, if query string, routes GET /api/.../:endpoint?name=raadaa&status=1
    index: async (req, res, next) => {
       
        let noQuery = _.isEmpty(req.query);
        let builder = null;
        

        Cuisine.find(builder).sort({created_at: -1}).exec(function (err, result) {
            if(err)
                return res.send(err);
            return res.send({success: true, data: result, message: 'Cuisine retrieved successfully'});
        })
    },

    seedCuisine: async (req, res, next) => {
       
        let arr = [];
        Cuisine.find().exec((err, data) => {
            if (err) throw err;
            if(data.length > 0) {
                console.log('Cuisine already seeded');
                return res.send({success: true, message: 'Cuisine already seeded'});
            }else {
                cuisines.forEach((req, index) => {
                    
                    Cuisine.findOne({name: req.name })
                    .then(response => { if(response != null) {
                        console.log('Name Reference is already in use.')
                        }
                
                    
                            console.log(req.name)
                            let cuisine = new Cuisine ({
                                
                                name: req.name,
                                slug: req.slug,
                                
                            
                            })
                            cuisine.save()
                            .then(response => {        
                                            
                                                
                                console.log('Cuisine added successfully!')
                                return res.send({success: true, message: 'Cuisine seeded successfully!'});
                         
                         })
                         .catch(error => {
                             
                             console.log('An error occured!' + error)
                         
                         })
                            
                        })
                   
                });
            }
        })
    
        }
    
    }
    

