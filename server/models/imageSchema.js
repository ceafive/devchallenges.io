const mongoose = require('mongoose')

const ImageSchema = new mongoose.Schema({
  name: String,
  img: {
    data: Buffer,
    contentType: String,
  },
})

// Image is a model which has a schema ImageSchema
module.exports = mongoose.model('Image', ImageSchema)
