const fp = require("fastify-plugin")
module.exports = fp(async function (app, options) {
    app.register(require("fastify-jwt"), {
        secret: options.token
    })

    app.decorate(options.decorate || "authenticate", async function (req, res) {
        try {
            await req.jwtVerify()
        } catch (err) {
            res.code(401).send({ type: 'error', message: 'Invalid token.',server_message: err.message })
        }
    })
})