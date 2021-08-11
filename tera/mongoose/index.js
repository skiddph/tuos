const mongoose = require("mongoose");
const fp = require("fastify-plugin");

module.exports = fp(async function (fastify, options, done) {
  const APPNAME = options.config?.appName || 'SYSTEM'
  const LOGGER = options.config?.fastify?.logger || false
  const config = options.config.plugins?.mongoose || {}
  const optionsDefault = {
    "useNewUrlParser": true,
    "config": {
      "autoIndex": true
    },
    "useUnifiedTopology": true,
    "useFindAndModify": false,
    "useCreateIndex": true
  }
  const models = config?.models || {}

  await mongoose.connect(options.mongo, optionsDefault).then(() => {
    if (LOGGER) console.log(`[${APPNAME}] Connected to database.`);
  }).catch(e => {
    if (LOGGER) console.log("\n[DATABASE ERROR]",e)
  })

  fastify.decorate("mongoose", {
    instance: mongoose,
    ...models,
  });

  done();
});