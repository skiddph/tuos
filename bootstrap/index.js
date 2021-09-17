const fp = require('fastify-plugin')
const path = require('path')
const tera = require('tuos-tera')

const plugin = async (fastify, options, done) => {
  await fastify.register(tera, {
    dir: path.resolve(__dirname, 'plugins'),
    options,
    order: [
      'cors',
      'swagger'
    ]
  })

  done()
}

module.exports = fp(plugin)
