const Fastify = require('fastify')
const fp = require("fastify-plugin");

const plugin = fp(async function (fastify, options) {
	const plugins = options?.plugins || []
	const APPNAME = options.config.appName || 'SYSTEM'
	let x = -1
	plugins.forEach(plugin => {
		x++
		try {
			fastify.register(plugin, options)
		} catch (err) {
			fastify.log.error(`[${APPNAME}] Plugin Install: Failed on index: ${x}`) 
			process.exit(1);
		}
	})
});

const server = (options) => {
	const fastify = Fastify(options.config.fastify || {})
	plugin(fastify, options)
	return {
		fastify,
		start: async () => {
			const PORT = options.port || 8080;
			const HOST = options.host || "0.0.0.0";
			const APPNAME = options.config.appName || 'SYSTEM'
			fastify.log.info(`[${APPNAME}] Starting...`)
			await fastify.ready();
			await fastify
				.listen(PORT, HOST)
				.then((addr) => {
					fastify.log.info(`[${APPNAME}] Server listening on ${addr}`);
				})
				.catch((err) => {
					fastify.log.error(err);
					fastify.log.info(`[${APPNAME}] Failed to start server! exiting...`);
					process.exit(1);
				});
		}
	}
}

module.exports = {
	plugin,
	server,
	config: require('./tuos.json')
}