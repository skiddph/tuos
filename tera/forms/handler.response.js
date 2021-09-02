const _ = require('lodash')

module.exports = function (app) {
  const Model = app.bootstrap.plugins.blog.models.Quiz

  const modifySchema = {}
  const readSchema = {}
  const deleteSchema = {}

  // Create quiz handler
  const create = async (req, res) => {
    const body = _.pick(req.body, [
      'title',
      'description',
      'quiz_type',
      'has_score',
      'allow_edit',
      'tags',
      'questions'
    ])

    const quiz = new Model(body)

    const tstamp = Date.now()

    quiz.created_at = tstamp
    quiz.updated_at = tstamp
    quiz.author_id = req.user.id
    quiz.author_name = req.user.name
    quiz.alternate_id = app.usid.uuid()

    await quiz.save()
    res.json(quiz)
  }

  return {
    schema: {
      modify: modifySchema,
      read: readSchema,
      delete: deleteSchema
    },
    create
  }
}
