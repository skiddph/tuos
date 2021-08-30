const fp = require('fastify-plugin')

module.exports = fp(async function (app) {
  await app.register(require('./routes'))
})
