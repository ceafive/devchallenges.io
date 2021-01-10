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

    User.create({ email, password: hash, loginType: "email" }, (err, user) => {
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

      // console.log({ err, user });
      // return;
      if (!user)
        return res.status(401).json({ message: "Your email is incorrect" });

      if (user.loginType === "email") {
        const passwordVerify = await argon2.verify(user.password, password);
        if (passwordVerify) {
          // password match
          return tokenSend(user, res);
        } else {
          // password did not match
          return res
            .status(401)
            .json({ message: "Your password is incorrect" });
        }
      }
      return tokenSend(user, res);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post("/social", (req, res) => {
  // console.log(req.body);
  const { name, email, loginType } = req.body;
  if (!email) return res.status(401).json({ message: "No Email found" });

  const newData = {};
  if (name) newData.name = name;
  if (email) newData.email = email;
  if (loginType) newData.loginType = loginType;

  if (loginType === "facebook") {
    const { picture } = req.body;
    if (picture && picture.data.url) newData.photo = picture.data.url;
  }

  if (loginType === "google") {
    const { imageUrl } = req.body;
    if (imageUrl) newData.photo = imageUrl;
  }

  if (loginType === "github") {
    const { avatar_url } = req.body;
    if (avatar_url) newData.photo = avatar_url;
  }

  // console.log({ newData });
  // return;

  User.findOne({ email }, async (err, user) => {
    if (err) return res.status(500).json(err);
    if (!user) {
      return User.create(newData, (err, user) => {
        if (err) {
          if (err.code && err.code == 11000) {
            const field = Object.keys(err.keyValue);

            return res.status(409).json({
              message: `An account with that ${field} already exists.`,
            });
          }

          if (err.name === "ValidationError") {
            let errors = Object.values(err.errors).map((el) => el.message);
            let fields = Object.values(err.errors).map((el) => el.path);
            let code = 400;

            if (errors.length > 1) {
              const formattedErrors = errors.join(" ");
              res
                .status(code)
                .json({ message: formattedErrors, fields: fields });
            } else {
              res.status(code).json({ message: errors, fields: fields });
            }
          }
        }

        return tokenSend(user, res);
      });
    }

    return tokenSend(user, res);
  });
});

module.exports = router;
