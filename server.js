require("dotenv").config()
require('./tera/api').server({
	port: process.env.PORT || (() => {
		console.log("[SYSTEM] Using default PORT");
		return "8080"
	})(),
	host: process.env.HOST || (() => {
		console.log("[SYSTEM] Using default HOST IP");
		return "0.0.0.0"
	})(),
	token: process.env.JWT_TOKEN || (() => {
		console.log("[SYSTEM] Using default SECRET_TOKEN");
		return "tuos_default_jwt_token"
	})(),
	mongo: process.env.MONGO_DIRECT || (() => {
		console.log("[SYSTEM] Using default DB HOST");
		return "mongodb://localhost:27017/tuos"
	})(),
	config: require('./tera/api').config,
	plugins: [
		require('fastify-cors'),
		require('./tera/rate-limit'),
		require('./tera/misc'),
		require('./tera/mongoose'),
		require('./tera/mailer'),
		require('./tera/jwt'),
		require('./tera/auth').plugin,
		require('./tera/blog').plugin,
		require('./tera/my-api').plugin,
		require('./tera/static'),
	],
	db_models: {
		...require('./tera/auth').models,
		...require('./tera/blog').models,
		...require('./tera/my-api').models,
	},
	mailer: {
		secure: process.env.MAILER_SECURE == "1",
		host: process.env.MAILER_HOST,
		auth: {
			user: process.env.MAILER_USER,
			pass: process.env.MAILER_PASS
		}
	}
}).start()