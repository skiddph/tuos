require('dotenv').config()
const fastify = require('fastify')({ logger: true })

const options = {
  mongoose: {
    connect: 'mongodb://localhost:27017/tuos'
  }
}

fastify.register(require('tuos-mongoose'), options)
fastify.register(require('tuos-tera'), {
  dir: 'plugins',
  order: [
    'jwt',
    ['auth', 'blog', 'myapi', 'classroom', 'forms']
  ]
})

fastify.listen(process.env.PORT || 8080, process.env.HOST || '0.0.0.0')
