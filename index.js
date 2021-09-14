const fp = require('fastify-plugin')

const plugin = async (fastify, opts, done) => {
  await fastify.register(require('tuos-mongoose'), opts)
  await fastify.register(require('tuos-auth'), opts)
  done()
}

module.exports = {
  plugin: fp(plugin, {
    fastify: '>=3.0.0',
    name: 'tuos-app'
  })
}
