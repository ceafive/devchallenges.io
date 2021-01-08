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

router.post("/", upload.single("image"), function (req, res, next) {
  try {
    //send image back to browser
    const file = req.file;
    const imagePath = file.path.replace(/^public\//, "");
    return res.status(201).json({
      message: "File uploaded successfully",
      url: imagePath,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
