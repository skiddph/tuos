require('dotenv').config()
const fastify = require('fastify')({ logger: true })

fastify.register(require('tuos-tera'), {
  dir: 'plugins',
  order: [
    'mongoose',
    'jwt',
    ['auth', 'blog', 'myapi', 'classroom', 'forms']
  ]
})

fastify.listen(process.env.PORT || 8080, process.env.HOST || '0.0.0.0')
