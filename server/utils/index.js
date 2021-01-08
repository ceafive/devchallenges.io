const multer = require("multer");

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
  destination: "../public/uploads/",

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

module.exports = {
  upload,
};
