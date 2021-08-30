const mongoose = require('mongoose')

module.exports = require('fastify-plugin')(async function (fastify, options, done) {
  await mongoose.connect(options.mongo, {
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
