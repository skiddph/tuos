const mongoose = require("mongoose");
const fp = require("fastify-plugin");

module.exports = fp(async function (fastify, options) {
  const APPNAME = options.config?.appName || 'SYSTEM'
  const LOGGER = options.config?.fastify?.logger || false
  const config = options.config.plugins?.mongoose || {}
  const optionsDefault = config.options || {}
  const models = config?.models || {}
  const pluginId = config?.id || "mongoose"

  try {
    await mongoose.connect(options.mongo, optionsDefault);
    if (LOGGER) console.log(`[${APPNAME}] Connected to database.`);
  } catch (err) {
    if (LOGGER) console.error(err);
  }

  fastify.decorate(pluginId, {
    instance: mongoose,
    ...models,
  });
});