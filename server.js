require("dotenv").config();
const fastify = require("fastify")({ logger: true });
const path = require("path");

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || "0.0.0.0";


fastify.register(require('fastify-swagger'),{
	exposeRoute: true,
	routePrefix: '/docs',
	swagger: {
		info: {
			title: 'fastify-api'
		}
	}
})
fastify.register(require("./src/plugins/mongoose"))
fastify.register(require("./src/plugins/uuid"))
fastify.register(require("fastify-cors"), {});

fastify.register(require("fastify-static"), {
	root: path.join(__dirname, "public"),
	index: ["index.html", "README.md"],
});

// ROUTES
fastify.register(require("./src/routes/users"));
fastify.register(require("./src/routes/usid"));


const start = async () => {
	await fastify.ready();
	await fastify
		.listen(PORT, HOST)
		.then((addr) => console.log(`[SYSTEM] Server listening on ${HOST}:${PORT}`))
		.catch((err) => {
			console.log("[SYSTEM] Failed to start server! exiting");
			fastify.log.error(err);
			process.exit(1);
		});
};

start();
