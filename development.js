const path = require('path')
const fp = require('fastify-plugin')

const plugin = async (fastify, options, done) => {
  console.log('[MODE] Development')

  const tera = require('./core/tera')
  await fastify.register(require('./bootstrap'), options)

  await fastify.register(tera, {
    dir: path.resolve(__dirname, 'core/mongoose/plugins'),
    options
  })

  await fastify.register(tera, {
    dir: path.resolve(__dirname, 'core/auth/plugins'),
    options
  })

  return done()
}

module.exports = fp(plugin, {
  fastify: '>=3.0.0',
  name: 'tuos-app-dev'
})
