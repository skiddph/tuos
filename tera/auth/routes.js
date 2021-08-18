module.exports = async function (app, options, done) {
	const h = require('./handler')(app, options)

	// Auth Routes
	// app.httpMethod(endpoint, preHandler, handler)
	app.post('/api/auth/register', h.rschema([ 'user', 'name', 'pass' ]), h.register)
	app.post("/api/auth/login", h.rschema([ 'pass' ]), h.login)
	app.get("/api/user", h.rdschema, h.read)
	app.get("/api/user/@:user",  h.rdschema, h.read)
	app.get("/api/user/$:_id",  h.rdschema, h.read)
	app.get("/api/users",  h.rdschema, h.reads)
	app.get("/api/users/:page", h.rdschema, h.reads)
	app.get("/api/users/:page/:items",  h.rdschema, h.reads)
	app.put("/api/user",  h.auth, h.update)
	app.delete("/api/user",  h.auth, h.delete)

	done();
}
