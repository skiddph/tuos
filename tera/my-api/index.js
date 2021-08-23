module.exports = {
  plugin: require('./plugin'),
  handler: require('./handler'),
  models: {
    MyAPI: require('./model.myapi')
  },
  routes: require('./routes')
}
