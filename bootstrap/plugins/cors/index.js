const fp = require('fastify-plugin')
const cors = require('fastify-cors')

const plugin = async (fastify, opts, done) => {
  await fastify.register(cors, opts.cors || {})
  done()
}

module.exports = {
  plugin: fp(plugin)
}
