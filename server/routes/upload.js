const express = require('express')
const multer = require('multer')
const router = express.Router()

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error('Incorrect file')
    error.message = 'INCORRECT_FILETYPE'
    error.status = 422

    return cb(error, false)
  }
  cb(null, true)
}
const storage = multer.diskStorage({
  destination: './public/uploads/',

  filename(req, file, cb) {
    cb(null, Date.now() + file.originalname)
  },
})

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5000000,
  },
})

/* GET users listing. */
router.post('/', upload.single('file'), (req, res, next) => {
  try {
    const file = req.file
    const imagePath = file.path.replace(/^public\//, '')
    res.json({ url: imagePath })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
