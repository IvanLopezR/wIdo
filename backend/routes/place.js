const express = require('express');
const passport = require('passport');
const router  = express.Router();
const Place = require("../models/Place");
const parser = require('../config/cloudinary.js');

/* GET home page */
router.get('/places', (req, res, next) => {
  console.log("places");
    Place.find().then(places => {
      console.log(places);
        res.json(places);
  })
    .catch((err) => {
      console.log(err)
    })
});

module.exports = router;