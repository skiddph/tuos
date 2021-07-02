const autoload = require('fastify-autoload')
const path = require("path");
module.exports = async function (fastify, opts) {
  fastify.register(autoload, { dir: path.join(__dirname, 'plugins') })
  fastify.register(autoload, { dir: path.join(__dirname, 'routes') })
}
