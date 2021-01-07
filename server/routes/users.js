const passport = require("passport");
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../models/user");

//SIGN UP LOGIC
router.post("/register", (req, res) => {
  try {
    const newUser = new User({ email: req.sanitize(req.body.email) });
    User.register(newUser, req.sanitize(req.body.password), (err, user) => {
      if (err) return res.send(err);
      tokenRegister(user, res);
    });
  } catch (error) {
    res.send(error);
  }
});

//LOGIN LOGIC
router.post("/login", passport.authenticate("local"), (req, res) => {
  try {
    const user = req.user;
    tokenRegister(user, res);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve redirecting
//   the user to google.com.  After authorization, Google will redirect the user
//   back to this application at /auth/google/callback
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get(
  "/google/callback",
  passport.authenticate("google"),
  function (req, res) {
    console.log(req.user);
  }
);

//TOKEN SIGNUP AND USER VERIFICATION
const tokenRegister = (user, res) => {
  const token = jwt.sign({ id: user._id }, process.env.SECRET, {
    expiresIn: "24h", // expires in 24 hours
    issuer: "Dev-Auth-App",
  });
  res.status(200).json({
    auth: true,
    token,
    user: { id: user._id, email: user.email },
  });
};

module.exports = router;
