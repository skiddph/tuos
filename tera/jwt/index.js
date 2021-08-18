const fp = require("fastify-plugin")
const JwtHandler = require('./handler.jwt')

const TuosJwt = async function (app, options) {
    app.register(require("fastify-jwt"), {
        secret: options.token
    })
    app.decorate("jwte", null)
    
    const { authenticate } = JwtHandler(app)
    app.decorate("authenticate", authenticate)
}

module.exports = fp(TuosJwt, {
    fastify: '>=3.0.0-alpha.1',
    name: 'tuos-jwt'
})