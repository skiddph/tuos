require("dotenv").config();
const app = require('./api').server
const config = {
	port: process.env.PORT,
	host: process.env.HOST,
	token: process.env.JWT_TOKEN,
	mongo: process.env.MONGO_DIRECT,
	config: require('./api').config,
	plugins: [
		require('./mongoose'),
		require('./auth').plugin,
		require('./static'),
		require('fastify-cors')
	]
}

config.config.plugins.mongoose.models = {...require('./auth').models(config)}
app(config).start()