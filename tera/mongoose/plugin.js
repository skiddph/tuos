const mongoose = require('mongoose')

module.exports = require('fastify-plugin')(async function (fastify, options, done) {
  const mongoDirect = process.env.MONGO_DIRECT ||
   options.mongo ||
   (() => {
     console.log('[PLUGIN] mongoose: Using default credentials')
     return 'mongodb://localhost:27017/tuos'
   })()

  await mongoose.connect(mongoDirect, {
    useNewUrlParser: true,
    config: {
      autoIndex: true
    },
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
    .then(() => {
      console.log('[PLUGIN] mongoose: Connected.')
    })
    .catch(e => {
      console.error('[PLUGIN] mongoose: Connect ERROR', e)
    })

  fastify.decorate('mongoose', mongoose)

  done()
})
