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
		readOneByIdSchema,
		readMany,
		readManySchema,
	} = fastify.handler.users

	fastify.post("/api/auth/register", createSchema, create)
	fastify.post("/api/auth/login", loginSchema, login)
	fastify.get("/api/user/@:user", { ...authenticate(), ...readOneByUserSchema }, readOneByUser)
	fastify.get("/api/user/$:id", { ...authenticate(), ...readOneByIdSchema }, readOneById)
	fastify.get("/api/users", { ...authenticate(), ...readManySchema }, readMany)
	fastify.get("/api/users/:page", { ...authenticate(), ...readManySchema }, readMany)
	fastify.get("/api/users/:page/:items", { ...authenticate(), ...readManySchema }, readMany)

	done();
}
