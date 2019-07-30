const express = require('express');
const passport = require('passport');
const router = express.Router();
const Place = require("../models/Place");
const User = require("../models/User");
const uploader = require('../config/cloudinary.js');

/* GET home page */
router.get('/places', (req, res, next) => {
  Place.find().then(places => {
    res.json(places);
  })
    .catch((err) => {
      console.log(err)
    })
});

router.post('/changePicture', uploader.single("imgName"), (req, res, next) => {
  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }
  res.json({ secure_url: req.file.secure_url });
})

router.post('/create', (req, res, next) => {
  Place
    .create({
      title: req.body.title,
      imgName: req.body.imgName,
      coordinates:{
        lat: req.body.lat,
        lng: req.body.lng,
      },
      type: req.body.type,
      author: req.body.author,
      timestamps: req.body.timestamps,
    })
    .then(createdTask => {
      User.findByIdAndUpdate(req.user._id,{$push: {places: createdTask._id}},{new:true})
        .populate("places")
        .then( user => {
          console.log(user)
          res.json(user);
        }
        )
    })
})


  // Place
  //   Place.find().then(places => {
  //     console.log(places);
  //       res.json(places);
  // })
  //   .catch((err) => {
  //     console.log(err)
  //   })
// });

module.exports = router;