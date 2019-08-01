const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const uploader = require('../config/cloudinary');

router.get('/community', (req, res, next) => {
  User.find().then(users => {
    res.json(users);
  })
    .catch((err) => {
      console.log(err)
    })
});

router.post('/userDetails/:id', (req, res, next) => {
  User
    .findById(req.params.id)
    .then(user => res.json(user))
    .catch((err) => {
      console.log(err)
    })
});

router.post('/userPlaces', (req, res, next) => {
  User
    .findById(req.body.id)
    .then(user => res.json(user))
    .catch((err) => {
      console.log(err)
    })
})

router.post('/userCountries', (req, res, next) => {
  User
    .findByIdAndUpdate(req.user._id, { $push: { countries: req.body.country } }, { new: true })
    .then(updateData => {
      res.json(updateData);
    })
    .catch((err) => {
      console.log(err)
    })
})

router.put('/editProfile/:id', (req, res, next) => {
  const name = req.body.name;
  const address = req.body.address;
  const country = req.body.country;
  const email = req.body.email;
  const phone = req.body.phone;
  const id = req.body.id;
  User
    .findByIdAndUpdate(id, {
      name: name,
      address: address,
      country: country,
      email: email,
      phone: phone
    })
    .then(updatedData => {
      res.json(updatedData);
    })
    .catch((err) => {
      console.log(err)
    })
});

router.post('/changePicture', uploader.single("imgName"), (req, res, next) => {
  // console.log('file is: ', req.file)

  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }
  // get secure_url from the file object and save it in the 
  // variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend
  res.json({ secure_url: req.file.secure_url });
})

router.post('/things/create', (req, res, next) => {
  const img = req.body.newThing;
  User
    .findByIdAndUpdate(req.user._id, {
      imgName: img
    })
    .then(updatedData => {
      res.json(updatedData);
    })
    .catch((err) => {
      console.log(err)
    })
});


router.post('/findUserPlaces', (req, res, next) => {
  User
    .findById(req.body.userId)
    .populate('places')
    .then(user => {
      res.json(user)
    })
    .catch(err => console.log(err))
});


router.post('/follow', (req, res, next) => {
  User
    .findByIdAndUpdate(req.body.ownId, { $push: { following: req.body.userId } }, { new: true })
    .then(updateData => {
      User
        .findByIdAndUpdate(req.body.userId, { $push: { followers: req.body.ownId } }, { new: true })
        .then(update => {
          res.json(update);
        })
    })
})

router.post('/unfollow', (req, res, next) => {
  User
  .findByIdAndUpdate(req.body.own._id, { $pull: { following: req.body.user._id } }, { new: true })
    .then(updateData => {
      User
        .findByIdAndUpdate(req.body.user._id, { $pull: { followers: req.body.own._id } }, { new: true })
        .then(update => {
          res.json(update);
        })
    })
})

router.post('/followers', (req, res, next) => {
  User
  .findOne(req.body.userId)
  .then(user => {
    res.json(user.followers)
  })
  .catch(err => console.log(err))
})

router.post('/following', (req, res, next) => {
  User
  .findOne(req.body.userId)
  .then(user => {
    res.json(user.following)
  })
  .catch(err => console.log(err))
})


module.exports = router;
