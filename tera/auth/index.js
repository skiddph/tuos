module.exports = {
	plugin: require('./plugin'),
	handler: require('./handler'),
	jwt: require('./jwt'),
	models: (options) => ({
		Users: require('./ModelUsers')(options)
	}),
	routes: require('./routes')
}
