require("dotenv").config();
const app = require('./tera/api').server
const config = {
	port: process.env.PORT,
	host: process.env.HOST,
	token: process.env.JWT_TOKEN,
	mongo: process.env.MONGO_DIRECT,
	config: require('./tera/api').config,
	plugins: [
		require('./tera/mongoose'),
		require('./tera/auth').plugin,
		require('./tera/static'),
		require('./tera/rate-limit'),
		require('fastify-cors')
	]
}

config.config.plugins.mongoose.models = {...require('./tera/auth').models(config)}
app(config).start()