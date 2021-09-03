const _ = require('lodash')

module.exports = function (app) {
  const Model = app.bootstrap.plugins.classroom.models.Classroom
  const schema = {
    preValidation: [app.preAuth],
    schema: {
    }
  }

  const filterTags = function (tags) {
    if (!tags) return []
    tags = String(tags).toLowerCase()
    const tagsArray = tags.split(',')
    const result = []
    tagsArray.forEach(tag => result.push(tag.trim()))
    return result
  }

  const filterClassId = function (id) {
    return id.match(/^[0-9a-fA-F]{24}$/) ? { _id: id } : { alternate_id: id }
  }

  const filterUserResponseData = function (data) {
    return _.pick(data, ['alternate_id', 'title', 'description', 'privacy', 'theme', 'tags', 'created_at', 'updated_at'])
  }

  const isManaged = function (req, classroom) {
    if (!req.isAuthenticated) return false
    if (req.user._id === classroom.user_id) return true
    if (req.user.role === 'admin') return true
    return false
  }

  const filterClassData = (body) => _.pick(body, ['title', 'description', 'privacy', 'theme', 'tags', 'max_allowed'])

  const create = async (req, res) => {
    if (!req.isAuthenticated) return res.code(200).send({ type: 'error', message: 'Unauthorized request' })
    const data = filterClassData(req.body)

    const tstamp = Date.now()

    const classroom = new Model()
    classroom.alternate_id = app.usid.uuid()
    classroom.title = data.title || 'UNKNOWN'
    classroom.description = data.description || ''
    classroom.privacy = data.privacy || 'public'
    classroom.theme = data.theme || 'default'
    classroom.teacher_id = req.user.id
    classroom.teacher_name = req.user.name
    classroom.create_at = tstamp
    classroom.update_at = tstamp
    classroom.tags = filterTags(data.tags)
    classroom.max_allowed = data.max_allowed || 100
    classroom.approved = 0
    classroom.rejected = 0
    classroom.banned = 0
    classroom.status = 'published'

    return await classroom.save()
      .then((c) =>
        res.code(200).send({
          status: 'success',
          message: 'Classroom successfully created.',
          data: c._doc
        })
      )
      .catch((e) => {
        res.code(200).send({
          type: 'error',
          message: 'Failed to create classroom: ' + String(e.message)
        })
      })
  }

  const get = async (req, res) => {
    return await Model.findOne(filterClassId(req.params.id))
      .then((c) => {
        if (!c) {
          return res.code(200).send({
            type: 'error',
            message: 'Classroom not found.'
          })
        }
        if (c._doc.privacy === 'public') {
          return res.code(200).send({
            status: 'success',
            message: 'Classroom successfully retrieved.',
            data: isManaged(req, c._doc) ? c._doc : filterUserResponseData(c._doc)
          })
        } else if (c._doc.privacy === 'private') {
          if (!req.isAuthenticated) throw new Error('Unauthorized request')
          return res.code(200).send({
            status: 'success',
            message: 'Classroom successfully retrieved.',
            data: isManaged(req, c._doc) ? c._doc : filterUserResponseData(c._doc)
          })
        } else if (c._doc.privacyy === 'secret') {
          if (!req.isAuthenticated) throw new Error('Unauthorized request')
          if (req.user._id === c._doc.teacher_id) { // or is a student
            return res.code(200).send({
              status: 'success',
              message: 'Classroom successfully retrieved.',
              data: isManaged(req, c._doc) ? c._doc : filterUserResponseData(c._doc)
            })
          } else throw new Error('Unauthorized request')
        } else throw new Error('Invalid classroom data')
      })
      .catch((e) => {
        res.code(200).send({
          type: 'error',
          message: 'Failed to retrieve classroom: ' + String(e.message)
        })
      })
  }
  const update = async (req, res) => {
    if (!req.isAuthenticated) return res.code(200).send({ type: 'error', message: 'Unauthorized request' })
    const data = filterClassData(req.body)

    const tstamp = Date.now()

    return await Model.findOne(filterClassId(req.params.id))
      .then((c) => {
        if (!c) {
          return res.code(200).send({
            type: 'error',
            message: 'Classroom not found.'
          })
        }
        c.title = data.title || 'UNKNOWN'
        c.description = data.description || ''
        c.privacy = data.privacy || 'public'
        c.theme = data.theme || 'default'
        c.update_at = tstamp
        c.tags = filterTags(data.tags)
        c.teacher_name = req.user.name
        c.max_allowed = data.max_allowed || 100
        return c.save()
      })
      .then((c) =>
        res.code(200).send({
          status: 'success',
          message: 'Classroom successfully updated.',
          data: c._doc
        })
      )
      .catch((e) => {
        res.code(200).send({
          type: 'error',
          message: 'Failed to update classroom: ' + String(e.message)
        })
      })
  }
  const remove = async (req, res) => {
    if (!req.isAuthenticated) return res.code(200).send({ type: 'error', message: 'Unauthorized request' })
    return await Model.findOne(filterClassId(req.params.id))
      .then((c) => {
        if (!c) {
          return res.code(200).send({
            type: 'error',
            message: 'Classroom not found.'
          })
        }
        return c.remove()
      })
      .then(() =>
        res.code(200).send({
          status: 'success',
          message: 'Classroom successfully removed.'
        })
      )
      .catch((e) => {
        res.code(200).send({
          type: 'error',
          message: 'Failed to remove classroom: ' + String(e.message)
        })
      })
  }
  const listPublic = async (req, res) => {
    const page = req.params.page || 1
    const items = req.params.items || 10

    return await Model.paginate({ privacy: 'public' }, { page: page, limit: items })
      .then((c) => {
        if (!c) {
          return res.code(200).send({
            type: 'error',
            message: 'Classrooms not found.'
          })
        }
        return res.code(200).send({
          status: 'success',
          message: 'Classrooms successfully retrieved.',
          data: c
        })
      })
      .catch((e) => {
        res.code(200).send({
          type: 'error',
          message: 'Failed to retrieve classrooms: ' + String(e.message)
        })
      })
  }

  const listManaged = async (req, res) => {
    if (!req.isAuthenticated) return res.code(200).send({ type: 'error', message: 'Unauthorized request' })

    const page = req.params.page || 1
    const items = req.params.items || 10

    return await Model.paginate({ teacher_id: req.user.id }, { page: page, limit: items })
      .then((c) => {
        if (!c) {
          return res.code(200).send({
            type: 'error',
            message: 'Classrooms not found.'
          })
        }
        return res.code(200).send({
          status: 'success',
          message: 'Classrooms successfully retrieved.',
          data: c
        })
      })
      .catch((e) => {
        res.code(200).send({
          type: 'error',
          message: 'Failed to retrieve classrooms: ' + String(e.message)
        })
      })
  }

  return {
    create,
    update,
    delete: remove,
    get,
    listPublic,
    listManaged,
    schema
  }
}
