const fp = require("fastify-plugin")

module.exports = fp(async function (fastify) {
  fastify.register(require('fastify-swagger'), {
    exposeRoute: true,
    routePrefix: '/docs',
    swagger: {
      info: {
        title: 'fastify-api'
      }
    }
  })
})