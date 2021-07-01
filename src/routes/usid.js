module.exports = function register(fastify, options, done){

	const len = options.defaultLength || 24

	fastify.get("/api/id",(req,res) => {
		res.send({id: fastify.usid.uuid(len)})
	})

	fastify.get("/api/id/:len",(req,res) => {
		console.log()
		res.send({id: fastify.usid.uuid(req.params.len || len)})
	})

	done();
}
