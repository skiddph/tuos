const mongoose = require("mongoose");

module.exports = require("fastify-plugin")(async function (fastify, options, done) {
  const APPNAME = options.config?.appName || 'SYSTEM'

  await mongoose.connect(options.mongo, {
    "useNewUrlParser": true,
    "config": {
      "autoIndex": true
    },
    "useUnifiedTopology": true,
    "useFindAndModify": false,
    "useCreateIndex": true
  })
    .then(() => {
      fastify.log.info(`[${APPNAME}] Connected to database.`)
    })
    .catch(e => {
      fastify.log.error(`[${APPNAME}] DATABASE ERROR`)
      console.error(`\n[SYSTEM] DATABASE ERROR`, e)
    })

  fastify.decorate("mongoose", mongoose)

  done();
});