const fp = require('fastify-plugin')
const routes = require('./routes')

const plugin = async (fastify, options, done) => {
  await fastify.register(routes, options)

  done()
}

module.exports = fp(plugin, {
  fastify: '>=3.0.0',
  name: 'tuos-forms'
})
