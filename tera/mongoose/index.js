const mongoose = require("mongoose");
const fp = require("fastify-plugin");

module.exports = fp(async function (fastify, options, done) {
  const APPNAME = options.config?.appName || 'SYSTEM'
  const LOGGER = options.config?.fastify?.logger || false
  const config = options.config.plugins?.mongoose || {}
  const optionsDefault = config.options || {}
  const models = config?.models || {}
  const pluginId = config?.id || "mongoose"

  await mongoose.connect(options.mongo, optionsDefault).then(() => {
    if (LOGGER) console.log(`[${APPNAME}] Connected to database.`);
  }).catch(e => {
    if (LOGGER) console.log("\n[DATABASE ERROR]",e)
  })

  fastify.decorate(pluginId, {
    instance: mongoose,
    ...models,
  });

  done();
});