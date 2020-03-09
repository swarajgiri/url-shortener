module.exports = (cfg) => {
  const UrlShortener = require('../models/urlShortener')
  const shortid = require('shortid')

  const shorten = async (url) => {
    const previouslySaved = await UrlShortener.findOne({ url })
    let shortenedId = ''

    if (!previouslySaved) {
      shortenedId = shortid.generate()
      await UrlShortener.create({ url, shortId: shortenedId })
    } else {
      shortenedId = previouslySaved.shortId
    }

    return `${cfg.baseUrl}/${shortenedId}`
  }

  const get = async (shortId) => {
    const isSaved = await UrlShortener.findOne({ shortId })
    let originalUrl = ''

    if (isSaved) {
      originalUrl = isSaved.url
    }

    return originalUrl
  }

  return {
    shorten,
    get
  }
}
