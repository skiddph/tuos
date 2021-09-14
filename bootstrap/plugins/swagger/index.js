const fp = require('fastify-plugin')
const path = require('path')
const swagger = require('fastify-swagger')

const plugin = async (fastify, opts, done) => {
  await fastify.register(swagger, {
    routePrefix: '/docs',
    mode: 'static',
    specification: {
      path: path.resolve(__dirname, '../../../openapi.yaml'),
      postProcessor: function (swaggerObject) {
        return swaggerObject
      }
    },
    exposeRoute: true
  })
  done()
}

module.exports = {
  plugin: fp(plugin)
}
