
module.exports = async function (app, options, done) {
  const h = require('./handler')(app)
  const url = '/myapi/:id/:name'

  app.get(url, {}, h.codexec)
  app.post(url, {}, h.codexec)
  app.put(url, {}, h.codexec)
  app.delete(url, {}, h.codexec)

  app.get('/api/myapi/:id', { ...h.auth }, h.read)
  app.get('/api/myapis', { ...h.auth }, h.reads)
  app.get('/api/myapis/:page', { ...h.auth }, h.reads)
  app.get('/api/myapis/:page/:items', { ...h.auth }, h.reads)
  app.post('/api/myapi', { ...h.auth }, h.create)
  app.put('/api/myapi/:id', { ...h.auth }, h.update)
  app.delete('/api/myapi/:id', { ...h.auth }, h.delete)
  app.delete('/api/myapis', { ...h.auth }, h.deletes)

  done()
}
