const fp = require("fastify-plugin")
const { join } = require('path')
module.exports = fp(async function (fastify) {
  fastify.register(require("fastify-static"), {
    root: join(__dirname, "../../public"),
    index: ["index.html", "README.md"],
  });
})