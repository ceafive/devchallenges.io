const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");
const cors = require("cors");
const expressSanitizer = require("express-sanitizer");
const dotenv = require("dotenv").config();

const app = express();

const profileRouter = require("./routes/profile");
const usersRouter = require("./routes/users");

// connect DB
require("./utils/db");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(expressSanitizer());

//configure PassportJS
require("./utils/auth");

app.use("/api", usersRouter);
app.use("/api", profileRouter);

module.exports = app;
