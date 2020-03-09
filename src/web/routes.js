module.exports = (app) => {
  const swaggerUi = require('swagger-ui-express')
  const swaggerDocument = require('../swagger/routes.json')

  app.use('/api/v1/shorten', require('./handlers/urlShortener'))

  app.use('/swagger', swaggerUi.serve)
  app.get('/swagger', swaggerUi.setup(swaggerDocument))
}
