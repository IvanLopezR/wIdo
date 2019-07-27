const express = require('express');
const passport = require('passport');
const router  = express.Router();
const User = require("../models/User");
const parser = require('../config/cloudinary.js');

/* GET home page */

// This route finds the first user, takes the file from the request with the key 'picture' and save the 'pictureUrl'
router.post('/first-user/pictures', parser.single('picture'), (req, res, next) => {
  User.findOneAndUpdate({}, { pictureUrl: req.file.url })
    .then(() => {
      res.json({
        success: true,
        pictureUrl: req.file.url
      })
    })
});

router.get('/community', (req, res, next) => {
    User.find().then(users => {
        res.json(users);
  })
    .catch((err) => {
      console.log(err)
    })
});

router.get('/userDetails/:id', (req, res, next) => {
  User
    .findById(req.params.id)
    .then(user => res.json(user))
    .catch((err) => {
      console.log(err)
    })
});

router.put('/editProfile/:id', (req, res, next) => {
  const name = req.body.name;
  const address = req.body.address;
  const country = req.body.country;
  const email = req.body.email;
  const phone = req.body.phone;
  User
  .findByIdAndUpdate(req.params.id, {
    name: name,
    address: address,
    country: country,
    email: email,
    phone: phone
  })
  .then(updatedData => {
    res.redirect('/profile');
  })
    .catch((err) => {
      console.log(err)
    })
});

module.exports = router;