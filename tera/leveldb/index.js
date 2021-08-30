const fp = require('fastify-plugin')

const LevelDB = async function (app) {
  const namespace = 'db'

  await app.register(require('fastify-leveldb'), { name: namespace })

  const store = {
    set: async function (key, value) {
      return await app.level[namespace].put(key, value)
    },
    get: async function (key, def) {
      return await app.level[namespace].get(key).catch(() => def)
    }
  }

  app.decorate('store', store)
}

module.exports = {
  plugin: fp(LevelDB, {
    fastify: '>=3.0.0-alpha.1',
    name: 'tuos-jwt'
  })
}
