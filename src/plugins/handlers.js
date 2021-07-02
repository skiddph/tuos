const fp = require("fastify-plugin");
const autoload = require('auto-load')
const path = require('path')

module.exports = fp(async function (fastify) {
  const raw = Object(autoload(path.join(__dirname, '../handlers')))
  const handlers = {}
  for (var key in raw) {
    console.log(typeof raw[key])
    if (typeof raw[key] == 'function') {
      handlers[key] = raw[key](fastify)
    }
  }
  fastify.decorate("handler", handlers);
});