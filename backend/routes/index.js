const express = require('express');
const router  = express.Router();
const parser = require('../config/cloudinary.js');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = router;
