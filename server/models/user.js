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
    required: [true, "Enter a valid email"],
    trim: true,
    match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  },
  password: {
    type: String,
    minlength: 6,
    trim: true,
  },
  photo: {
    type: mongoose.Schema.Types.Mixed,
    default: {
      contentType: "image/jpg",
      data_url: new Buffer.from(encode_image, "base64"),
    },
  },
  name: {
    type: String,
  },
  bio: {
    type: String,
    maxlength: 200,
  },
  phone: {
    type: String,
  },
  loginType: {
    type: String,
  },
});

UserSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
  usernameLowerCase: true,
});

const User = mongoose.model("User", UserSchema);
module.exports = User;