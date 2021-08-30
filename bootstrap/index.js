const path = require('path')
const Fastify = require('fastify')
const _ = require('lodash')
const autoload = require('auto-load')

class Bootstrap {
  // mode - all | order | only
  constructor (options = {}) {
    if (!('plugins' in options)) options.plugins = {}

    this.dir = options.plugins.dir || path.join(__dirname, '../tera')
    this.primary = options.plugins.primary || []
    this.excluded = options.plugins.excluded || []
    this.only = options.plugins.only || []
    this.order = options.plugins.order || []
    this.strict = options.plugins.strict || true
    this.mode = options.plugins.mode || 'all'
    this.PORT = process.env.PORT || options.port || 8080
    this.HOST = process.env.HOST || options.host || '0.0.0.0'
    this.fastifyOpts = options.config ? options.config.fastify || {} : {}
    this.installed = []
    this.plugins = []
    this.fastify = Fastify(this.fastifyOpts)
    this.options = options
  }

  getPlugins () {
    const dirs = _.omit(autoload(this.dir), this.excluded)
    const plugins = {}
    for (const key in dirs) {
      if ('index' in dirs[key] && 'plugin' in dirs[key].index) plugins[key] = dirs[key].index
    }
    this.plugins = plugins
  }

  isInstalled (key) {
    return Array(Object.keys(this.installed)).includes(key)
  }

  isPlugin (key) {
    return Array(Object.keys(this.plugins)).includes(key)
  }

  async install (key) {
    console.log(`[PLUGIN] ${key}: Installing...`)
    try {
      if (this.isInstalled(key)) {
        console.log('[PLUGIN] ' + key + ': Already installed')
      } else if (!this.isPlugin) {
        console.log('[PLUGIN] ' + key + ': Plugin is not listed')
      } else {
        this.installed.push(key)
        await this.fastify.register(this.plugins[key].plugin, this.options)
        console.log('[PLUGIN] ' + key + ': Installed')
      }
    } catch (e) {
      console.log('[PLUGIN] ' + key + ': Failed to install', e)
      if (this.strict) process.exit(1)
    }
  }

  async installList (keys) {
    if (Array.isArray(keys)) {
      await keys.forEach(async key => {
        await this.install(key)
      })
    }
  }

  async installOnly () {
    if (Array.isArray(this.only)) this.plugins = _.pick(this.plugins, this.only)
  }

  async installPrimary () {
    await this.installList(this.primary)
  }

  async installMongo (mongoKey = 'mongo') {
    if (mongoKey in this.plugins) {
      await this.install(mongoKey)
      if (this.isInstalled(mongoKey)) {
        for (const key in _.omit(this.plugins, this.installed)) {
          if ('models' in this.plugins[key]) await this.install(key)
        }
      }
    }
  }

  async installSecondary () {
    const list = Object.keys(_.omit(this.plugins, this.installed))
    await this.installList(list)
  }

  async masterInstallAll () {
    await this.fastify.decorate('bootstrap', { plugins: this.plugins, options: this.options })
    await this.installPrimary()
    await this.installMongo('mongo')
    await this.installMongo('mongoose')
    await this.installSecondary()
  }

  async masterInstallOnly () {
    await this.installOnly()
    await this.masterInstallAll()
  }

  async masterInstallOrder () {
    await this.fastify.decorate('bootstrap', { plugins: this.plugins, options: this.options })
    if (Array.isArray(this.order)) this.order.forEach(async key => await this.install(key))
  }

  async init () {
    this.getPlugins()

    switch (this.mode) {
      case 'all':
        await this.masterInstallAll()
        break
      case 'only':
        await this.masterInstallOnly()
        break
      case 'order':
        await this.masterInstallOrder()
        break
      default:
        throw new Error('[PLUGIN] Master installer: Invalid mode (available: all|only|order)')
    }

    await this.fastify.ready()
    await this.fastify
      .listen(this.PORT, this.HOST)
      .then((addr) => {
        console.log(`[APP] Server: listening on ${addr}`)
      })
      .catch((err) => {
        console.log('[APP] Server: Failed to start', err)
        process.exit(1)
      })
  }
}

module.exports = Bootstrap
