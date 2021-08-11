module.exports = async function (app, options, done) {

	const h = require('./handler')(app)
	const hb = require('./handler.blog')(app)
	const hc = require('./handler.comment')(app)
	const hv = require('./handler.vote')(app)

	// Blog Post Routes
	app.get('/api/blog/:blog_id', {}, hb.read)
	app.get('/api/blogs', {}, hb.reads)
	app.get('/api/blogs/:page', {}, hb.reads)
	app.get('/api/blogs/:page/:items', {}, hb.reads)
	app.post('/api/blog', {...h.auth}, hb.write)
	app.put('/api/blog/:blog_id', {...h.auth}, hb.update)
	app.delete('/api/blog/:blog_id', {...h.auth}, hb.delete)
	app.delete('/api/blogs', {...h.auth}, hb.deletes)

	done();
}
