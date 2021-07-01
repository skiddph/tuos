const fp = require("fastify-plugin");
const USID = require("usid")
module.exports = fp(async function (fastify) {
  fastify.decorate("usid", new USID());
});