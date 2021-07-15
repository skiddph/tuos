require("dotenv").config();
const app = require('./api').server
const config = {
	port: process.env.PORT,
	host: process.env.HOST,
	token: process.env.JWT_TOKEN,
	mongo: process.env.MONGO_DIRECT,
	config: require('./tuos.json'),
	plugins: [
		require('./mongoose'),
		require('./auth').plugin,
		require('./src/plugins/swagger')
	]
}

config.config.plugins.mongoose.models = {
	...require('./auth').models(config)
}

app(config).start()