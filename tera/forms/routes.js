const FormHandler = require('./handler.form')
const FormResponseHandler = require('./handler.response')

module.exports = async function (app, options, done) {
  const hf = FormHandler(app)
  const hr = FormResponseHandler(app)

  app.post('/api/form', {}, hf.create)
  app.post('/api/form/:id', {}, hr.create)

  done()
}
