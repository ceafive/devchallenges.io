const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const path = require("path");
const fs = require("fs");

const filePath = path.resolve(
  path.join(__dirname, "../public/uploads/no-image.jpg")
);

const img = fs.readFileSync(filePath);
const encode_image = img.toString("base64");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    minlength: 6,
    trim: true,
  },
  photo: {
    type: Map,
    default: {
      contentType: "image/jpg",
      data_url: new Buffer.from(encode_image, "base64"),
    },
  },
  name: {
    type: String,
    default: "Enter your name...",
  },
  bio: {
    type: String,
    default: "Enter your bio...",
    maxlength: 200,
  },
  phone: {
    type: String,
    default: "Enter your phone number...",
  },
});

UserSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
  usernameLowerCase: true,
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
