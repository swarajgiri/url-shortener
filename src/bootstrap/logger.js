var bunyan = require('bunyan')
var cfg = require('../cfg')

var log = bunyan.createLogger({
  name: cfg.appname,
  streams: [
    {
      stream: process.stdout,
      level: 'info'
    }
  ],
  serializers: {
    req: bunyan.stdSerializers.req,
    res: bunyan.stdSerializers.res
  }
})

module.exports = log
