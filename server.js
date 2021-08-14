require("dotenv").config()
require('./tera/api').server({
	port: process.env.PORT || "8080",
	host: process.env.HOST || '0.0.0.0',
	token: process.env.JWT_TOKEN || (() => {
		console.log("[SYSTEM] Using default JWT Token");
		return "tuos_default_jwt_token"
	})(),
	mongo: process.env.MONGO_DIRECT || "mongodb://0.0.0.0:27017/tuos",
	config: require('./tera/api').config,
	plugins: [
		require('./tera/mongoose'),
		require('./tera/auth').plugin,
		require('./tera/static'),
		require('./tera/rate-limit'),
		require('./tera/blog').plugin,
		require('./tera/my-api').plugin,
		require('fastify-cors')
	],
	db_models: {
		...require('./tera/auth').models,
		...require('./tera/auth').models
	}
}).start()