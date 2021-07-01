const fp = require("fastify-plugin")

module.exports = fp(async function (fastify) {
  fastify.register(require("fastify-jwt"), {
    secret: process.env.JWT_TOKEN
  })

  fastify.decorate("authenticate", async function (req, res) {
    try {
      await req.jwtVerify()
    } catch (err) {
      res.code(401).send({ type: 'error', message: 'Invalid token.' })
    }
  })
})