const ClassroomHandler = require('./handler.classroom')
// const StudentHandler = require('./handler.student')

module.exports = async function (app, options, done) {
  const hc = ClassroomHandler(app)

  // classroom
  app.post('/api/classroom', hc.schema, hc.create) // create
  app.get('/api/classroom/:id', hc.schema, hc.get) // read
  app.put('/api/classroom/:id', hc.schema, hc.update) // update
  app.delete('/api/classroom/:id', hc.schema, hc.delete) // delete
  app.get('/api/classrooms/public', hc.schema, hc.listPublic) // list public
  app.get('/api/classrooms/public/:page', hc.schema, hc.listPublic) // list public
  app.get('/api/classrooms/public/:page/:items', hc.schema, hc.listPublic) // list public
  app.get('/api/classrooms/managed', hc.schema, hc.listManaged) // list managed
  app.get('/api/classrooms/managed/:page', hc.schema, hc.listManaged) // list managed
  app.get('/api/classrooms/managed/:page/:items', hc.schema, hc.listManaged) // list managed
  done()
}
