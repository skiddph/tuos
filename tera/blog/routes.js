module.exports = async function (app, options, done) {

	const h = require('./handler')(app)
	const hb = require('./handler.blog')(app)
	const hc = require('./handler.comment')(app)
	const hv = require('./handler.vote')(app)

	// Blog Post Routes
	// app.get('/api/blog/:blog_id', {...h.auth}, hb.read)
	// app.post('/api/blogs', {...h.auth}, hb.reads)
	app.post('/api/blog', {...h.auth}, hb.write)
	app.put('/api/blog/:blog_id', {...h.auth}, hb.update)
	app.delete('/api/blog/:blog_id', {...h.auth}, hb.delete)
	app.delete('/api/blogs', {...h.auth}, hb.deletes)

	done();
}
