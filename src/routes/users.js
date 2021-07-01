module.exports = function register(fastify, options, done) {
	const { create, login } = require('../handlers/users')(fastify)

	fastify.post("/api/users/register", create)
	fastify.post("/api/auth/login", login)
	fastify.get("/api/user/@/:username", { preValidation: [fastify.authenticate] }, (req, res) => {
		res.send(req.user)
	})
	done();
}
