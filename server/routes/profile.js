const express = require("express");
const path = require("path");
const fs = require("fs");

const router = express.Router();
const { upload } = require("../utils");

const User = require("../models/user");

/* GET user profile. */
router.get("/profile/:id", async function (req, res, next) {
  try {
    const { id } = req.params;

    const user = await User.findById(id).exec();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json("Error getting user");
    console.log(error);
  }
});

router.post("/profile", upload.single("photo"), async (req, res, next) => {
  try {
    const { id, name, bio, phone, email, password } = req.body;

    const newData = {
      name,
      bio,
      phone,
      email,
    };

    if (req.file) {
      const img = fs.readFileSync(req.file.path);
      const encode_image = img.toString("base64");

      // Define a JSONobject for the image attributes for saving to database
      const photo = {
        contentType: req.file.mimetype,
        data_url: new Buffer.from(encode_image, "base64"),
      };
      newData.photo = photo;
    }

    const user = await User.findByIdAndUpdate(id, newData).exec();

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
