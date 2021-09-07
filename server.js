
require('dotenv').config()
// const path = require('path')
const fastify = require('fastify')({ logger: true })
// const tera = require('tuos-tera')

const options = {
  mongoose: { connect: process.env.MONGO_DIRECT || 'mongodb://localhost:27017/tuos' },
  jwt: { secret_token: process.env.JWT_TOKEN || 'jwt_default_token' }
}

// fastify.register(tera, {
//   dir: path.resolve(__dirname, 'plugins'),
//   options,
//   only: ['swagger']
// })

fastify.register(require('tuos-mongoose'), options)
fastify.register(require('tuos-auth'), options)

// fastify.register(tera, {
//   dir: path.resolve(__dirname, '../tuos-mongoose/plugins'),
//   options
// })

// fastify.register(tera, {
//   dir: path.resolve(__dirname, '../tuos-auth/plugins'),
//   options,
//   order: [
//     'jwt'
//   ]
// })

// fastify.register(tera, {
//   dir: path.resolve(__dirname, 'plugins'),
//   options,
//   only: ['static']
// })

fastify.listen(process.env.PORT || 8080, process.env.HOST || '0.0.0.0')
