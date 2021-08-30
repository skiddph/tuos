const autoload = require('auto-load')
const path = require('path')
const Fastify = require('fastify')
const _ = require('lodash')
const installedPlugins = []
const projectConfig = require('./project.config')
const getPlugins = function (dir, excluded = []) {
  const dirs = _.omit(autoload(dir), excluded)
  const plugins = {}

  for (const key in dirs) {
    if ('index' in dirs[key] && 'plugin' in dirs[key].index) {
      plugins[key] = dirs[key].index
    }
  }

  return plugins
}

const installMongo = async function (fastify, options, plugins) {
  let isInstalled = false

  if ('mongo' in plugins) {
    try {
      await fastify.register(plugins.mongo.plugin, options)
      isInstalled = true
      installedPlugins.push('mongo')
      console.log('[PLUGIN] mongo: Installed')
    } catch (e) {
      console.log('[PLUGIN] mongo: Failed to install', e)
    }
  } else if ('mongoose' in plugins) {
    try {
      await fastify.register(plugins.mongoose.plugin, options)
      isInstalled = true
      installedPlugins.push('mongoose')
      console.log('[PLUGIN] mongoose: Installed')
    } catch (e) {
      console.log('[PLUGIN] mongoose: Failed to install', e)
    }
  } else if ('mongo' in plugins || 'mongoose' in plugins) {
    isInstalled = true
    console.log('[PLUGIN] mongo or mongoose: already installed')
  }

  if (!isInstalled) {
    for (const key in _.omit(plugins, installedPlugins)) {
      if (typeof plugins[key] === 'object' && 'models' in plugins[key]) { installedPlugins.push(key) }
    }
  } else {
    for (const key in _.omit(plugins, installedPlugins)) {
      if (typeof plugins[key] === 'object' && 'models' in plugins[key]) {
        try {
          await fastify.register(plugins[key].plugin, options)
          installedPlugins.push(key)
          console.log('[PLUGIN] ' + key + ': Installed')
        } catch (e) {
          console.log('[PLUGIN] ' + key + ': Failed to install', e)
        }
      }
    }
  }
}

const installPrimary = async function (fastify, options, plugins, allowed) {
  for (const key in _.pick(plugins, allowed)) {
    try {
      await fastify.register(plugins[key].plugin, options)
      installedPlugins.push(key)
      console.log('[PLUGIN] ' + key + ': Installed')
    } catch (e) {
      console.log('[PLUGIN] ' + key + ': Failed to install', e)
    }
  }
}

const installSecondary = async function (fastify, options, plugins) {
  for (const key in _.omit(plugins, installedPlugins)) {
    try {
      await fastify.register(plugins[key].plugin, options)
      installedPlugins.push(key)
      console.log('[PLUGIN] ' + key + ': Installed')
    } catch (e) {
      console.log('[PLUGIN] ' + key + ': Failed to install', e)
    }
  }
}

const init = async function (options = {}) {
  if (!('config' in options)) options.config = projectConfig

  const pluginsDir = options.pluginsDir || path.join(__dirname, '../tera')
  const fastifyOpts = options.config ? options.config.fastify || {} : {}
  const primaryPlugins = options.plugins.primary || []
  const excludedPlugins = options.plugins.excluded || []
  const fastify = Fastify(fastifyOpts)
  const plugins = getPlugins(pluginsDir, excludedPlugins)

  console.log('[APP] Starting...')

  await fastify.decorate('bootstrap', { plugins, options })

  await installPrimary(fastify, options, plugins, primaryPlugins)
    .catch(e => console.warn('[PLUGIN] MASTER primary failed to install', e))

  await installMongo(fastify, options, _.omit(plugins, excludedPlugins))
    .catch(e => console.warn('[PLUGIN] MASTER mongo: Failed to install', e))

  await installSecondary(fastify, options, plugins, _.omit(plugins, excludedPlugins))
    .catch(e => console.warn('[PLUGIN] MASTER secondary: Failed to install', e))

  const PORT = process.env.PORT || options.port || 8080
  const HOST = process.env.HOST || options.host || '0.0.0.0'

  await fastify.ready()
  await fastify
    .listen(PORT, HOST)
    .then((addr) => {
      console.log(`[APP] Server: listening on ${addr}`)
    })
    .catch((err) => {
      console.log('[APP] Server: Failed to start', err)
      process.exit(1)
    })
}
module.exports = init
