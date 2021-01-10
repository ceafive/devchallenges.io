const passport = require("passport");
const express = require("express");
const argon2 = require("argon2");

const router = express.Router();

const { tokenSend } = require("../utils");
const User = require("../models/user");

//SIGN UP LOGIC
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const hash = await argon2.hash(password);

    User.create({ email, password: hash }, (err, user) => {
      if (err) {
        if (err.code && err.code == 11000) {
          const field = Object.keys(err.keyValue);

          return res
            .status(409)
            .json({ message: `An account with that ${field} already exists.` });
        }

        if (err.name === "ValidationError") {
          let errors = Object.values(err.errors).map((el) => el.message);
          let fields = Object.values(err.errors).map((el) => el.path);
          let code = 400;

          if (errors.length > 1) {
            const formattedErrors = errors.join(" ");
            res.status(code).json({ message: formattedErrors, fields: fields });
          } else {
            res.status(code).json({ message: errors, fields: fields });
          }
        }
      }

      return tokenSend(user, res);
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

//LOGIN LOGIC
router.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;

    User.findOne({ email }, async (err, user) => {
      if (err) return res.status(500).json(err);
      if (!user)
        return res.status(401).json({ message: "Your email is incorrect" });

      const passwordVerify = await argon2.verify(user.password, password);
      if (passwordVerify) {
        // password match
        return tokenSend(user, res);
      } else {
        // password did not match
        return res.status(401).json({ message: "Your password is incorrect" });
      }
    });
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

module.exports = router;
