const fp = require('fastify-plugin')

module.exports = {
  plugin: fp(async function (fastify) {
    fastify.register(require('fastify-rate-limit'), {
      max: 100,
      timeWindow: 60000,
      cache: 10000
    })
  })
}
