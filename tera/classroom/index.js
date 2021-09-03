module.exports = {
  plugin: require('./plugin'),
  handlers: {
    classroom: require('./handler.classroom'),
    student: require('./handler.student')
  },
  models: {
    Classroom: require('./model.classroom'),
    Student: require('./model.student')
  },
  routes: require('./routes')
}
