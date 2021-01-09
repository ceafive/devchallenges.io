const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");

// IMAGE UPLOAD
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpg", "image/jpeg", "image/png"];
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error("Incorrect file");
    error.message = "INCORRECT_FILETYPE";
    error.status = 422;

    return cb(error, false);
  }
  cb(null, true);
};

const storage = multer.diskStorage({
  destination: path.resolve(path.join(__dirname, "../public/uploads/")),

  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5000000,
  },
});

//TOKEN SIGNUP AND USER VERIFICATION
const tokenSend = (user, res) => {
  const token = jwt.sign({ id: user._id }, process.env.SECRET, {
    expiresIn: "24h", // expires in 24 hours
    issuer: "Dev-Auth-App",
  });
  res.status(200).json({
    auth: true,
    token,
    user: {
      id: user._id,
    },
  });
};

module.exports = {
  upload,
  tokenSend,
};
