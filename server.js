const options = require('./config')
const fastify = require('fastify')({ logger: true })

const start = async (fastify, options) => {
  if (process.env.NODE_ENV === 'production') await fastify.register(require('./production'), options)
  else await fastify.register(require('./development'), options)

  await fastify.ready()
  await fastify.listen(process.env.PORT || 8080, process.env.HOST || '0.0.0.0')
}

start(fastify, options)
