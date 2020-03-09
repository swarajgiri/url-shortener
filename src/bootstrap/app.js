
const express = require('express')
const config = require('../cfg')
const app = express()
const bodyParser = require('body-parser')
const log = require('./logger')
const minions = require('../minions')
const mongoose = require('mongoose')

// Set config
app.set('config', config)
app.set('log', log)

app.use(bodyParser.json())

// Init core modules
app.set('minions', minions(config))

// Load routes
require('../web/routes')(app)

// Handle 404
app.use((req, res) => {
  log.warn('404', {
    method: req.method,
    url: req.url,
    query: req.query,
    ip: req.ip
  })

  const { formatPayload } = req.app.get('minions').transformResponse

  const payload = formatPayload({
    status: 404,
    errors: [
      {
        field: 'Page',
        message: 'Page not found'
      }
    ]
  })

  res.status(payload.status).json(payload)
})

// Handle 500 errors
app.use((err, req, res, next) => {
  const { formatPayload } = req.app.get('minions').transformResponse

  if (!err) {
    return next()
  }

  if (err instanceof SyntaxError) {
    // invalid json body
    const payload = formatPayload({
      status: 400,
      errors: [
        {
          field: 'json',
          message: 'Invalid json'
        }
      ]
    })

    return res.status(payload.status).json(payload)
  }

  log.error('500', {
    method: req.method,
    url: req.url,
    query: req.query,
    ip: req.ip,
    err
  })

  const payload = formatPayload({
    status: 500,
    errors: [
      {
        field: 'Page',
        message: 'Internal server error. Something broke!'
      }
    ]
  })

  res.status(payload.status).json(payload)
})

app.listen(app.get('config').web.port, () => {
  const { uri, options } = app.get('config').db.mongodb
  const { baseUrl } = app.get('config')

  mongoose.connect(uri, options)
    .then((db) => {
      log.info('Connected to mongodb')
      log.info('Listening on port %s', app.get('config').web.port)
      log.info('Url shortener can be found on', `${baseUrl}/shorten`)
    })
    .catch((err) => log.fatal({ err }, 'Could not connect to mongodb'))
})
