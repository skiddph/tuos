const fp = require('fastify-plugin')
const JwtHandler = require('./handler.jwt')

const TuosJwt = async function (app, options) {
  await app.register(require('fastify-jwt'), {
    secret: options.token
  })

  app.decorateRequest('bearerToken', null)

  const { authenticate } = JwtHandler(app)
  app.decorate('authenticate', authenticate)
}

module.exports = {
  plugin: fp(TuosJwt, {
    fastify: '>=3.0.0-alpha.1',
    name: 'tuos-jwt'
  }),
  handlers: JwtHandler
}
