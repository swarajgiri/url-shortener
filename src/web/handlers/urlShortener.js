const express = require('express')
const router = express.Router()
const url = require('url') // eslint-disable-line

router.post('/', async (req, res, next) => {
  const minions = req.app.get('minions')
  const { formatPayload } = minions.transformResponse
  const { shorten } = minions.urlShortener

  const errors = validateUrl(req.body.url)

  if (errors.length) {
    const payload = formatPayload({ errors, status: 400 })
    return res.status(payload.status).json(payload)
  }

  try {
    const shortened = await shorten(req.body.url)
    const payload = formatPayload({ data: { shortened } })
    res.status(payload.status).json(payload)
  } catch (err) {
    return next(err)
  }
})

router.get('/:shortId', async (req, res, next) => {
  const minions = req.app.get('minions')
  const { formatPayload } = minions.transformResponse
  const { get } = minions.urlShortener

  try {
    const originalUrl = await get(req.params.shortId)
    const payload = formatPayload({ data: { originalUrl } })
    res.status(payload.status).json(payload)
  } catch (err) {
    return next(err)
  }
})

function validateUrl (url) {
  const errors = []
  let originalUrl

  try {
    originalUrl = new URL(url)
  } catch (err) {
    errors.push(
      {
        field: 'url',
        message: `Url is required and must be a valid url. ${originalUrl} is an invalid valid`
      }
    )
  }

  return errors
}

module.exports = router
