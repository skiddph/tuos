const fp = require('fastify-plugin')

module.exports = fp(async function (app) {
  app.register(require('./routes'))
})
