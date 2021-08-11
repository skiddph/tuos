module.exports = async function (app, options, done) {

	const h = require('./handler')(app)
	const hb = require('./handler.blog')(app)
	const hc = require('./handler.comment')(app)
	const hv = require('./handler.vote')(app)

	// Auth Routes
	// app.httpMethod(endpoint, preHandler, handler)
	// app.post('/blog', {...h.auth}, hb.write)
	// app.get(r[`${p}read-user`], h.rdauth(), h.read)
	// app.put(r[`${p}update`], h.rdauth(), h.update)
	// app.delete(r[`${p}delete`], h.rdauth(), h.delete)

	done();
}
