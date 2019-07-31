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
  if (passwordNew !== passwordNew2) {
    res.json({ errorMessage: "Passwords isn't equals." });
    return
  }
  User
    .findById(id)
    .then(foundUser => {
      if (!bcrypt.compareSync(password, foundUser.password)) {
        res.json({ errorMessage: "Wrong password" });
        return;
      }
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(passwordNew, salt);
      User
        .findByIdAndUpdate(id, {
          password: hashPass,
        })
        .then(updatedData => {
          res.json({ successMessage: "Password has been changed." });
        })
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
    return;
  }
  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.json({ message: "The username already exists" });
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

router.post('/invite', (req, res, next) => {
    const emailFriend = req.body.emailFriend;
    const name = req.user.name;
    transporter.sendMail({
      from: '"wIdo📍" <process.env.USER>',
      to: emailFriend,
      subject: `${name} invite you to participate in wIdo - Social Network Locations 📌`,
      text: 'Awesome Message',
      html: `<b>Start today discovering the favourite places of your friends and share your's</b>
              <a
              href="https://wido-social-media.herokuapp.com">Click here</a> and complete in few minutes the form to be part of wIdo, the great Social Netword Location.`
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