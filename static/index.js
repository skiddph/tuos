const fp = require("fastify-plugin")
const { join } = require('path')
module.exports = fp(async function (app, options) {
	
	app.register(require('../client/root-js'),options)
})