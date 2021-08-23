module.exports = async function (app, options, done) {
  const h = require('./handler.users')(app, options)

  // Auth Routes
  // app.httpMethod(endpoint, preHandler, handler)
  app.post('/api/auth/register', h.rschema(['user', 'name', 'pass']), h.register)
  app.post('/api/auth/login', h.rschema(['pass']), h.login)
  app.delete('/api/auth/logout', h.auth, h.logout)
  app.delete('/api/auth/logout/session/:_id', h.auth, h.logoutSession)
  app.delete('/api/auth/logout/all', h.auth, h.logouts)
  app.get('/api/auth/session', h.auth, h.session)
  app.get('/api/auth/session/:id', h.auth, h.session)
  app.get('/api/auth/sessions', h.auth, h.sessions)
  app.get('/api/auth/sessions/:page', h.auth, h.sessions)
  app.get('/api/auth/sessions/:page/:items', h.auth, h.sessions)
  app.get('/api/user', h.rdschema, h.read)
  app.get('/api/user/@:user', h.rdschema, h.read)
  app.get('/api/user/$:_id', h.rdschema, h.read)
  app.get('/api/users', h.rdschema, h.reads)
  app.get('/api/users/:page', h.rdschema, h.reads)
  app.get('/api/users/:page/:items', h.rdschema, h.reads)
  app.put('/api/user', h.auth, h.update)
  app.delete('/api/user', h.auth, h.delete)

  done()
}
