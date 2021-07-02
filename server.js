require("dotenv").config();
const fastify = require("fastify")({ logger: true });
fastify.register(require("./src/autoload"))

const start = async () => {
	const PORT = process.env.PORT || 8080;
	const HOST = process.env.HOST || "0.0.0.0";
	await fastify.ready();
	await fastify.listen(PORT, HOST).then((addr) => console.log(`[SYSTEM] Server listening on ${addr}`)).catch((err) => {
		fastify.log.error(err);
		console.log("[SYSTEM] Failed to start server! exiting...");
		process.exit(1);
	});
};

start();