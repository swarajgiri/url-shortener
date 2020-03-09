
const _ = require('lodash')
const env = process.env.NODE_ENV || 'development'
const { name } = require('../package.json')

const cfg = {
  appname: name,
  web: {
    port: process.env.PORT
  },
  db: {
    mongodb: {
      uri: process.env.MONGODB_URI,
      options: {
        useNewUrlParser: true,
        useFindAndModify: false
      }
    }
  },
  baseUrl: `http://localhost:${process.env.PORT}/api/v1`,
  shortIdWorker: process.env.shortIdWorker || _.random(16)
}

module.exports = _.merge(cfg, require('./' + env))
