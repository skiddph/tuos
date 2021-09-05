const _ = require('lodash')
const TokenHandler = (app) => {
  const { Tokens } = app.tuos.plugins.auth.models

  // create a new token
  const newJWTToken = (payload) => String(app.jwt.sign({ ..._.pick(payload, (['_id', 'name', 'user', 'role'])) }))

  // create current user token record
  const createTokenRecord = async (req, payload) => {
    const token = newJWTToken(payload)
    const data = { token, user_id: payload._id, role: payload.role }
    data.device = req.headers['user-agent']
    data.ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1'
    data.created_at = Date.now()
    const record = new Tokens(data)
    return await record.save()
  }

  // delete current token record
  const deleteTokenRecord = async (req) => await Tokens.findOneAndDelete({ user_id: req.user._id, token: req.bearerToken })

  // deletes all users token record except current user
  const deleteTokensRecord = async (req) => await Tokens.remove({ user_id: req.user._id, token: { $ne: req.bearerToken } })

  // delete specific record by id or token
  const deleteTokenRecordByIdOrToken = async (req) => await Tokens.findOneAndDelete({ user_id: req.user._id, ...(req.params._id && req.params._id.match(/^[0-9a-fA-F]{24}$/) ? { _id: req.params._id } : { token: req.params._id }) })

  // read single current token record
  const readTokenRecord = async (req) => await Tokens.findOne({ user_id: req.user._id, ...(req.params._id ? { _id: req.params._id } : { token: req.bearerToken }) })

  // read many token records
  const readTokenRecords = async (req, page = 1, items = 10) => await Tokens.paginate({
    user_id: req.user._id
  }, {
    page: req.params.page || page,
    limit: req.params.items || items
  })

  // read all token records
  const readAllTokenRecords = async (req) => await Tokens.find({ user_id: req.user._id })

  return {
    newJWTToken,
    createTokenRecord,
    deleteTokenRecord,
    deleteTokenRecordByIdOrToken,
    deleteTokensRecord,
    readTokenRecord,
    readTokenRecords,
    readAllTokenRecords
  }
}
module.exports = TokenHandler
