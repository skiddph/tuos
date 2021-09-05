const fp = require('fastify-plugin')
module.exports = {
  plugin: fp(async function (app, options) {
    await app.register(require('../../clients/root-js'), options)
  })
}
