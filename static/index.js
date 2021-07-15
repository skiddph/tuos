const fp = require("fastify-plugin")
const { join } = require('path')
module.exports = fp(async function (app) {
  app.register(require("fastify-static"), {
    root: join(__dirname, "../client/root/dist"),
    prefix: '/',
    index: ["index.html", "README.md"],
  });

  app.register(require('./fallback'))
})