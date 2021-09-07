require('dotenv').config()
const path = require('path')
const fastify = require('fastify')({ logger: true })

const options = {
  mongoose: { connect: process.env.MONGO_DIRECT || 'mongodb://localhost:27017/tuos' },
  jwt: { secret_token: process.env.JWT_TOKEN || 'jwt_default_token' }
}

if (process.env.NODE_ENV === 'production') {
  console.log('[MODE] Production')
  fastify.register(require('tuos-mongoose'), options)
  fastify.register(require('tuos-auth'), options)
} else {
  console.log('[MODE] Development')
  const tera = require('./core/tera')
  fastify.register(tera, {
    dir: path.resolve(__dirname, 'core/mongoose/plugins'),
    options
  })
  fastify.register(tera, {
    dir: path.resolve(__dirname, 'core/auth/plugins'),
    options
  })
}

fastify.listen(process.env.PORT || 8080, process.env.HOST || '0.0.0.0')
