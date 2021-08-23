module.exports = {
  plugin: require('./plugin'),
  handlers: {
    users: require('./handler.users'),
    tokens: require('./handler.tokens')
  },
  models: {
    Users: require('./model.users'),
    Tokens: require('./model.tokens')
  },
  routes: require('./routes')
}
