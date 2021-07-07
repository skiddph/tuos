module.exports = async function (app, options, done) {
	const c = options.config.plugins.auth
	const r = options.config.routes
	const h = require('./handler')(app, options)
	const p = c.routePrefix || 'auth-'; // key prefix

	// Auth Routes
	// app.httpMethod(endpoint, preHandler, handler)
	app.post(r[`${p}register`], h.rschema(c?.register?.required || ['user', 'name', 'pass']), h.register)
	app.post(r[`${p}login`], h.rschema(['pass']), h.login)
	app.get(r[`${p}read-me`], h.rdauth(), h.read)
	app.get(r[`${p}read-user`], h.rdauth(), h.read)
	app.get(r[`${p}read-id`], h.rdauth(), h.read)
	app.get(r[`${p}reads`], h.rdauth(), h.reads)
	app.get(r[`${p}reads-page`], h.rdauth(), h.reads)
	app.get(r[`${p}reads-page-items`], h.rdauth(), h.reads)

	done();
}
