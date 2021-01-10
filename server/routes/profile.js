const express = require("express");
const fs = require("fs");
const argon2 = require("argon2");

const router = express.Router();
const { upload } = require("../utils");

const User = require("../models/user");

/* GET user profile. */
router.get("/profile/:id", async function (req, res) {
  try {
    const { id } = req.params;

    const user = await User.findById(id).exec();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error getting user" });
    console.log(error);
  }
});

router.post("/profile", upload.single("photo"), async (req, res) => {
  try {
    const { id, name, bio, phone, email, password, image } = req.body;

    // console.log({ id, name, bio, phone, email, password, image });
    // return

    const newData = {
      name,
      bio,
      phone,
      email,
    };

    if (image) newData.photo = image;

    if (password) {
      if (password.length < 6) {
        return res
          .status(400)
          .json({ message: "Your password should be 6 letters long" });
      } else {
        const hash = await argon2.hash(password);
        newData.password = hash;
      }
    }

    if (req.file) {
      const img = fs.readFileSync(req.file.path);
      const encode_image = img.toString("base64");

      // Define a JSONobject for the image attributes for saving to database
      const photo = {
        contentType: req.file.mimetype,
        data_url: new Buffer.from(encode_image, "base64"),
      };

      newData.photo = photo;

      // logic to remove file from filesystem after saving to MongoDB
      fs.unlinkSync(req.file.path);
    }

    const user = await User.findByIdAndUpdate(id, newData).exec();

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
