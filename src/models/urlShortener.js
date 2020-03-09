const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UrlShortenerSchema = Schema({
  url: String,
  shortId: String
}, {
  timestamps: true
})

module.exports = mongoose.model('urlShortener', UrlShortenerSchema)
