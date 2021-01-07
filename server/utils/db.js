const express = require("express");
const mongoose = require("mongoose");
const app = express();

// SETTING DATABASE TO LOCAL OR REMOTE
const environment = app.get("env");
let URI = "";
if (environment === "test") URI = process.env.LOCALDB_TEST;
if (environment === "development") URI = process.env.LOCALDB;
if (environment === "production") URI = process.env.REMOTEDB;

mongoose.connect(URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to DB ====>", db.name);
});
