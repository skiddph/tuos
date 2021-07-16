const fp = require("fastify-plugin")
const { join } = require('path')
module.exports = fp(async function (app) {

	const prefix = '/public/';
	const dir = './root/dist';
	const index = dir + 'index.html'
	const routes = require('./root/dist/routes.json')

	app.register(require('fastify-static'), {
	  root: join(__dirname, dir),
	  prefix: '/'
	})

	routes.forEach(route => {
		app.get(route, function(req, res) {
			console.log('>> >> >>', route)
			return res.sendFile('index.html')
		})
	})
})