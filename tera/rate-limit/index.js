const fp = require("fastify-plugin");

module.exports = fp(async function (fastify, options) {
	fastify.register(require('fastify-rate-limit'), {
	  max: 100, 
	  timeWindow: 60000,
	  cache: 10000, 
	})
});