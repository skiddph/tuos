module.exports = async function (fastify, options, done) {
	const { create, createSchema, login, loginSchema, readOneSchema, authenticate, readOneByUser, readOneById } = fastify.handler.users

	fastify.post("/api/users/register", createSchema, create)
	fastify.post("/api/auth/login", loginSchema, login)
	fastify.get("/api/user/@:user", { ...authenticate(), ...readOneSchema }, readOneByUser)
	fastify.get("/api/user/$:id", { ...authenticate(), ...readOneSchema }, readOneById)

	done();
}
