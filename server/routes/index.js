const express = require("express");
const restuarantController = require("../controllers/restaurant.controller");
const route = express.Router();

route.get('/', restuarantController.index);

module.exports ={route}