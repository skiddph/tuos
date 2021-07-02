module.exports = async function (fastify, options, done) {

	const { uuid } = fastify.handler.usid

	fastify.get("/api/id", uuid.default)
	fastify.get("/api/id/:length", uuid.custom)

	done();
}
