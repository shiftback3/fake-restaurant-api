const _ = require("lodash");
const mongoose = require("mongoose");
const Location = require("../models/Location");


const locations = [
    { "name": "Lagos", "slug": "lagos"  },
    { "name": "Abuja", "slug": "abuja"  },
    { "name": "Johannesburg", "slug": "johannesburg" },
    { "name": "Manchester", "slug": "manchester"  },
    { "name": "New York", "slug": "new+york+city"  },
    { "name": "London", "slug": "london"  },
    { "name": "Nairobi", "slug": "nairobi"  },
    { "name": "Kampala", "slug": "kampala"  },
    { "name": "Cairo", "slug": "cairo"  },
    { "name": "Amsterdam", "slug": "amsterdam"  },
   
];

module.exports = {
    //routes GET /api/.../:endpoint, if query string, routes GET /api/.../:endpoint?name=raadaa&status=1
    index: async (req, res, next) => {
       let noQuery = _.isEmpty(req.query);
        let builder = null;
        

        Location.find(builder).sort({created_at: -1}).exec(function (err, result) {
            if(err)
                return res.send(err);
            return res.send({success: true, data: result, message: 'Location retrieved successfully'});
        })
       
    },

    seedLocation: async (req, res, next) => {
       
        let arr = [];
    Location.find().exec((err, data) => {
        if (err) throw err;
        if(data.length > 0) {
            console.log('Location already seeded');
            return res.send({success: true, message: 'Location already seeded'});
        }else {
            locations.forEach((req, index) => {
                
                Location.findOne({name: req.name })
                .then(response => { if(response != null) {
                    console.log('Name Reference is already in use.')
                    }
            
                
                        console.log(req.name)
                        let location = new Location ({
                            
                            name: req.name,
                            slug: req.slug,
                            
                        
                        })
                        location.save()
                        .then(response => {        
                                        
                                            
                            console.log('Location added successfully!')
                            return res.send({success: true, message: 'Location seeded successfully!'});
                     
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

