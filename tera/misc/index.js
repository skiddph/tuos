const fp = require('fastify-plugin')
const USID = require('usid')

module.exports = {
  plugin: fp(async function (fastify) {
    await fastify.decorate('usid', new USID())
  })
}
