module.exports = {
  plugin: require('./plugin'),
  routes: require('./routes'),
  handlers: {
    form: require('./handler.form'),
    response: require('./handler.response')
  },
  models: {
    Form: require('./model.form'),
    FormResponse: require('./model.response')
  }
}
