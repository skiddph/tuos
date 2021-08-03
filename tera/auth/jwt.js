const fp = require("fastify-plugin")
var md5 = require('md5');
module.exports = fp(async function (app, options) {
  app.register(require("fastify-jwt"), {
    secret: options.token
  })

  app.decorate(options.decorate || "authenticate", async function (req, res) {
    try {
      const payload  = await req.jwtVerify()
      const frPL = String(payload.hc);
      const frRQ = String(md5(payload._id + req.ip))
      console.log('\n\n',frPL == frRQ,`\n\n'${frPL}' == '${frRQ}'\n\n`)
      if(frPL != frRQ) res.code(401).send({ type: 'error', message: 'Invalid token.' })
    } catch (err) {
      res.code(401).send({ type: 'error', message: 'Invalid token.' })
    }
  })
})