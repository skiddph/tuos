const fp = require('fastify-plugin')
const { join } = require('path')

const root = async (app) => {
  //   const prefix = '/public/'
  const dir = './root/dist'
  //   const index = dir + 'index.html'
  const routes = require('./root/dist/routes.json')

  app.register(require('fastify-static'), {
    root: join(__dirname, dir),
    prefix: '/'
  })

  routes.forEach(route => {
    app.get(route, async (req, res) => res.sendFile('index.html'))
  })
}

module.exports = fp(root)
