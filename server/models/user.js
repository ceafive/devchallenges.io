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
});

UserSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
  usernameLowerCase: true,
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
