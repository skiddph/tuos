module.exports = async function (fastify, options, done) {
	const { create, login } = fastify.handler.users

	fastify.post("/api/users/register", create)
	fastify.post("/api/auth/login", login)
	done();
}
