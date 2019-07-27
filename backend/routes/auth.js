const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const nodemailer = require('nodemailer');

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

let transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: `${process.env.USER_NAME}`,
    pass: `${process.env.PASS}`
  }
});


router.get("/userData", (req, res) => {
  let user = JSON.parse(JSON.stringify(req.user))
  delete user.password
  delete user.__v
  res.json(user);
});


router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
    if (err) { res.status(500).json({ message: 'Something went wrong authenticating user' }); return; }
    // "failureDetails" contains the error messages from our logic in "LocalStrategy" { message: '...' }.
    if (!theUser) { res.status(401).json(failureDetails); return; }
    // save user in session
    req.login(theUser, (err) => {
      if (err) { res.status(500).json({ message: 'Session save went bad.' }); return; }
      // We are now logged in (that's why we can also send req.user)
      res.status(200).json(theUser);
    });
  })(req, res, next);
});

router.get("/signup", (req, res, next) => {
  res.render("/login");
});

router.post("/changePassword", (req, res, next) => {
  const passwordNew = req.body.passwordNew;
  const passwordNew2 = req.body.passwordNew2;
  const password = req.body.password;
  const id = req.user._id;
  console.log(password)
  console.log(passwordNew)
  console.log(passwordNew2)
  console.log(req.user);
  debugger;
  if (passwordNew !== passwordNew2) {
    res.render('auth/security', { errorMessage: "Write different password." });
    return
  }
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(passwordNew, salt);
  User
    .findByIdAndUpdate(id, {
      password: hashPass,
    })
    .then(updatedData => {
      res.redirect('/profile');
    })
    .catch((err) => {
      console.log(err)
    })
});

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;
  const email = req.body.email;
  const country = req.body.country;
  const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let token = '';
  for (let i = 0; i < 25; i++) {
    token += characters[Math.floor(Math.random() * characters.length)];
  }
  if (username === "" || password === "") {
    res.render("signup", { message: "Indicate username and password" });
    return;
  }
  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("signup", { message: "The username already exists" });
      return;
    }
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass,
      name,
      email,
      phone: "",
      address: "Madrid, España",
      country: country,
      imgName: "https://image.flaticon.com/icons/svg/149/149071.svg",
      token: token,
    });

    newUser.save()
      .then((user) => {
        transporter.sendMail({
          from: '"wIdo📍" <process.env.USER>',
          to: email,
          subject: 'Confirmation email - Social Network Locations 📌',
          text: 'Awesome Message',
          html: `<b>Confirm Account</b>
                  <a
                  href="http://localhost:3000/auth/confirm/${token}">Click here</a> and share your favourites locations with your contacts.`
        })
        res.json(user);
      })
      .catch(err => {
        console.log(err);
        res.json({ message: "Something went wrong" });
      })
  });
});

router.get("/confirm/:token", (req, res) => {
  let token = req.params.token;
  User.findOneAndUpdate({ token: req.params.token }, { $set: { status: "Active" } }, { new: true })
    .then((user) => {
      console.log("User activated");
      res.redirect("/auth/login")
    }).catch((err) => {
      console.log(err)
    })
});

router.get('/loggedin', (req, res, next) => {
  if (req.user) {
    res.status(200).json(req.user);
  }
})

router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).json({ message: 'logged out' });
});

module.exports = router;