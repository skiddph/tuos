const fp = require('fastify-plugin')
const JwtHandler = require('./handler.jwt')

const TuosJwt = async function (app, options) {
  await app.register(require('fastify-jwt'), {
    secret: process.env.JWT_TOKEN ||
    options.token ||
    (() => {
      console.log('[PLUGIN] jwt: Using default token')
      return 'tuos_default_jwt_token'
    })()
  })

  app.decorateRequest('bearerToken', null)
  app.decorateRequest('isAuthenticated', false)
  app.decorateRequest('isAdmin', false)

  const { authenticate, preAuth } = JwtHandler(app)
  app.decorate('authenticate', authenticate)
  app.decorate('preAuth', preAuth)
}

module.exports = {
  plugin: fp(TuosJwt, {
    fastify: '>=3.0.0-alpha.1',
    name: 'tuos-jwt'
  }),
  handlers: JwtHandler
}
