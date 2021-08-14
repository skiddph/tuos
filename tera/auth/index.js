module.exports = {
	plugin: require('./plugin'),
	handler: require('./handler'),
	jwt: require('./jwt'),
	models: {
		Users: require('./ModelUsers')
	},
	routes: require('./routes')
}
