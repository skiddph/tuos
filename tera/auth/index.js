module.exports = {
	plugin: require('./plugin'),
	handler: require('./handler'),
	models: {
		Users: require('./model.users'),
		Tokens: require('./model.tokens')
	},
	routes: require('./routes')
}
