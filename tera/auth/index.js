module.exports = {
	plugin: require('./plugin'),
	handler: require('./handler'),
	models: {
		Users: require('./model.users')
	},
	routes: require('./routes')
}
