module.exports = async function (fastify, options, done) {
	const { create, createSchema, login, loginSchema, readOneSchema, authenticate, readOneByUser } = fastify.handler.users

	fastify.post("/api/users/register", createSchema, create)
	fastify.post("/api/auth/login", loginSchema, login)
	fastify.get("/api/user/@:user", { ...authenticate(), ...readOneSchema }, readOneByUser)

	done();
}
