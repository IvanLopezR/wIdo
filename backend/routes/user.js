const express = require('express');
const passport = require('passport');
const router  = express.Router();
const User = require("../models/User");
const uploader = require('../config/cloudinary');

/* GET home page */

// This route finds the first user, takes the file from the request with the key 'picture' and save the 'pictureUrl'
// router.post('/first-user/pictures', uploader.single('picture'), (req, res, next) => {
//   User.findOneAndUpdate({}, { pictureUrl: req.file.url })
//     .then(() => {
//       res.json({
//         success: true,
//         pictureUrl: req.file.url
//       })
//     })
// });

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
    .findById(req.body.id)
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
    res.redirect('/profile');
  })
    .catch((err) => {
      console.log(err)
    })
});

router.post('/changePicture', uploader.single("imgName"), (req, res, next) => {
    console.log('file is: ', req.file)

    if (!req.file) {
      next(new Error('No file uploaded!'));
      return;
    }
    // get secure_url from the file object and save it in the 
    // variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend
    res.json({ secure_url: req.file.secure_url });
})

router.post('/things/create', (req, res, next) => {
  console.log(req.body.newThing);
  const img = req.body.newThing;
  console.log("Maldito"+img)
  User
  .findByIdAndUpdate(req.user._id, {
    imgName:img
  })
  .then(updatedData => {
    // res.redirect('/profile');
  })
    .catch((err) => {
      console.log(err)
    })
});

module.exports = router;
