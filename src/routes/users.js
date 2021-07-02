module.exports = async function (fastify, options, done) {
	const {
		create,
		createSchema,
		login,
		loginSchema,
		authenticate,
		readOneByUser,
		readOneByUserSchema,
		readOneById,
		readOneByIdSchema
	} = fastify.handler.users

	fastify.post("/api/users/register", createSchema, create)
	fastify.post("/api/auth/login", loginSchema, login)
	fastify.get("/api/user/@:user", { ...authenticate(), ...readOneByUserSchema }, readOneByUser)
	fastify.get("/api/user/$:id", { ...authenticate(), ...readOneByIdSchema }, readOneById)

	done();
}
