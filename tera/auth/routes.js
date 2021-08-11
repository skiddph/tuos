module.exports = async function (app, options, done) {
	const h = require('./handler')(app, options)

	// Auth Routes
	// app.httpMethod(endpoint, preHandler, handler)
	app.post('/api/auth/register', h.rschema([ 'user', 'name', 'pass' ]), h.register)
	app.post("/api/auth/login", h.rschema([ 'pass' ]), h.login)
	app.get("/api/user", h.rdauth(), h.read)
	app.get("/api/user/@:user", h.rdauth(), h.read)
	app.get("/api/user/$:_id", h.rdauth(), h.read)
	app.get("/api/users", h.rdauth(), h.reads)
	app.get("/api/users/:page", h.rdauth(), h.reads)
	app.get("/api/users/:page/:items", h.rdauth(), h.reads)
	app.put("/api/user", h.rdauth(), h.update)
	app.delete("/api/user", h.rdauth(), h.delete)

	done();
}
