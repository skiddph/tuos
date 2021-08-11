module.exports = {
	plugin: require('./plugin'),
	handler: {
		blog: require('./handler.blog'),
		comment: require('./handler.comment'),
		vote: require('./handler.vote'),
		handler: require('./handler')
	},
	models: {
		Blog: require('./model.blog')(),
		BlogComment: require('./model.comment')(),
		BlogVote: require('./model.vote')()
	},
	routes: require('./routes'),
}