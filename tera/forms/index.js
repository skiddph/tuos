module.exports = {
  plugin: require('./plugin'),
  handlers: {
  	form: require('./handler.form'),
  	response: require('./handler.response')
  },
  models: {
    Form: require('./model.form'),
    FormResponse: require('./model.response')
  },
  routes: require('./routes')
}
