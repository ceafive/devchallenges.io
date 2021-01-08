const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

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
    type: Buffer,
    data: [1, 2, 3],
  },
  name: {
    type: String,
    default: "Not Filled",
  },
  bio: {
    type: String,
    default: "Not Filled",
    maxlength: 200,
  },
  phone: {
    type: String,
    default: "Not Filled",
  },
});

UserSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
  usernameLowerCase: true,
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
