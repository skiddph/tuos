

module.exports = function register(fastify, options, done){

	fastify.get("/api/uid",(req,res) => {
		res.send(fastify.usid.uuid())
	})

	done();
}
