const _ = require("lodash");
const mongoose = require("mongoose");
const Restaurant = require("../models/Restaurant");
const axios = require('axios')

module.exports = {
    //routes GET /api/.../:endpoint, if query string, routes GET /api/.../:endpoint?name=raadaa&status=1
    index: async (req, res, next) => {
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
            const location = 'ChIJwYCC5iqLOxARy9nDZ6OHntw'
            const neighborhood = 'lagos'
            const borough = 'manhattan'
            const city = 'new+york+city'
            const category = 'chinesefood'
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

}