const _ = require('lodash')
const Joi = require('joi')
const Phone = Joi.extend(require('joi-phone-number'))
const bcrypt = require('bcrypt')
const passwordComplexity = require('joi-password-complexity')
const TokenHandler = require('./handler.tokens')

module.exports = function (app) {
  const { Users } = app.mongoose.models
  const {
    newJWTToken,
    createTokenRecord,
    deleteTokenRecord,
    deleteTokensRecord,
    readTokenRecord,
    readTokenRecords,
    readAllTokenRecords
  } = TokenHandler(app)

  async function pash (pass) {
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(pass, salt)
    return hashed
  }

  const userResponseSchema = [
    '_id',
    'name',
    'user',
    'phone',
    'phoneVerified',
    'email',
    'emailVerified',
    'created_at',
    'updated_at'
  ]

  const readResponseSchema = [
    '_id',
    'name',
    'user',
    'created_at'
  ]

  // Global Schema Template for Users Model
  const schemaParams = {
    params: {
      type: 'object',
      properties: {
        _id: { type: 'string' },
        user: { type: 'string' },
        page: { type: 'number' },
        items: { type: 'number' }
      }
    }
  }

  const schemaBody = {
    body: {
      type: 'object',
      required: [],
      properties: {
        _id: { type: 'string' },
        id: { type: 'string' },
        name: { type: 'string' },
        user: { type: 'string' },
        phone: { type: 'string' },
        phoneVerified: { type: 'boolean' },
        email: { type: 'string' },
        emailVerified: { type: 'boolean' },
        created_at: { type: 'number' },
        updated_at: { type: 'string' },
        token: { type: 'string' }
      }
    }
  }
  const gschema = {
    schema: {
      ...schemaParams,
      ...schemaBody
    }
  }

  const rdschema = {
    preValidation: [app.authenticate],
    schema: {
      ...schemaParams
    }
  }

  // Add additional required parameters to `schema.body.required` from Global Schema
  const rschema = (req = []) => {
    const schem = gschema
    schem.schema.body.required = req
    return schem
  }

  // Auth + Global Schema
  const auth = { preValidation: [app.authenticate], ...gschema }

  // Auth + Params for session
  const sessionSchema = { preValidation: [app.authenticate], schema: { ...schemaParams } }

  // Password Complexity for Password Validation
  const complexityOptions = {
    min: 5,
    max: 1024,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 4
  }

  // Request global validator for Users Model
  function validate (user) {
    const schema = Joi.object({
      _id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
      name: Joi.string().pattern(/^[a-zA-Z ]{2,50}$/),
      user: Joi.string().alphanum().min(3).max(30),
      pass: passwordComplexity(complexityOptions),
      npass: passwordComplexity(complexityOptions),
      string: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/),
      phone: Phone.string().phoneNumber(),
      email: Joi.string().email(),
      defaultPhoto: Joi.string().min(1)
    })
    return schema.validate(user)
  }

  // Register Handler
  const register = async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.code(200).send({ type: 'error', message: error.details[0].message })

    const dups = await Users.findOne({ user: req.body.user })
    if (dups) return res.code(200).send({ type: 'error', message: 'Username already exists' })

    const user = new Users(req.body)
    const tstamp = Date.now()
    user.created_at = tstamp
    user.updated_at = tstamp
    user.pass = await pash(req.body.pass)

    await user.save()
      .then(async (u) =>
        res.code(200).send({
          status: 'success',
          message: 'User successfully created.',
          data: _.pick(u._doc, userResponseSchema),
          token: newJWTToken(u, req)
        })
      )
      .catch((e) => {
        res.code(200).send({
          type: 'error',
          message: 'Failed to register. Please contact your administrator to fix this error'
        })
      })
  }

  // Login Handler
  const login = async (req, res) => {
    const preId = _.pick(req.body, (['user', 'id', 'email']))
    const loginId = preId.id || preId.user || preId.email

    const id = loginId.match(/^[0-9a-fA-F]{24}$/) ? { _id: loginId } : loginId.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ? { email: loginId } : { user: loginId }

    const entry = { ...id, pass: req.body.pass }

    const { error } = validate(entry)
    if (error) return res.code(200).send({ type: 'error', message: error.details[0].message })

    const user = await Users.findOne(id)
    if (!user) return res.code(200).send({ type: 'error', message: 'Invalid credentials' })

    const pass = await bcrypt.compare(entry.pass, user.pass)
    if (!pass) return res.code(200).send({ type: 'error', message: 'Invalid credentials' })

    const token = newJWTToken(user, req)

    await createTokenRecord(req, token, user._id)
      .then(() =>
        res.code(200).send({
          status: 'success',
          message: 'You are now logged in.',
          token: token,
          data: _.pick(user, userResponseSchema)
        })
      )
      .catch((e) => {
        console.log(e)
        res.code(200).send({ type: 'error', message: 'Server error! Failed to login, try again later.' })
      })
  }

  // Read Users Handler
  const read = async (req, res) => {
    const me = { _id: req.user?._id }
    const other = _.pick(req.params, ['user', '_id'])
    const find = (other._id || other.user) ? other : me
    const user = await Users.findOne(find)
    if (!user) return res.code(200).send({})
    res.send({
      status: 'success',
      message: 'User found successfully',
      data: _.pick(user, (user._id === req.user._id ? userResponseSchema : readResponseSchema))
    })
  }

  // Reads Users Handler
  const reads = async (req, res) => {
    const pg = _.pick(req.params, ['page', 'items'])
    const page = pg.page || 1
    const items = pg.items || 20
    const users = await Users.paginate({}, { page: page, limit: items })
    const result = []
    users.docs.forEach(u => result.push(_.pick(u, readResponseSchema)))
    res.send({
      status: 'success',
      message: `${users.docs.length} users found.`,
      data: result
    })
  }

  // Update User Handler
  const update = async (req, res) => {
    const preData = _.pick(req.body, ['user', 'email', 'pass', 'npass', 'name', 'phone'])
    const { error } = validate(preData)
    if (error) return res.code(200).send({ type: 'error', message: error.details[0].message })

    const { _id } = req.user
    const user = await Users.findOne({ _id })
    if (!user) return res.code(200).send({ type: 'error', message: 'User not found' })

    const pass = await bcrypt.compare(preData.pass || '', user.pass)
    if (!pass) return res.code(200).send({ type: 'error', message: 'Invalid credentials' })

    const data = _.pick(req.body, ['user', 'email', 'name', 'phone'])
    user.user = data.user || user.user
    user.email = data.email || user.email
    user.emailVerified = data.email ? false : user.emailVerified
    user.name = data.name || user.name
    user.phoneVerified = data.phone ? false : user.phoneVerified
    user.phone = data.phone || user.phone
    user.pass = preData.npass ? await pash(preData.npass) : user.pass
    user.updated_at = Date.now()

    await user.save()
      .then(() =>
        res.code(200).send({ type: 'success', message: 'User updated successfully.' })
      )
      .catch(() =>
        res.code(200).send({ type: 'error', message: 'Server error! Failed to update or username already exists' })
      )
  }

  // Delete User Handler
  const remove = async (req, res) => {
    if (!req.body?.pass) {
      return res
        .code(200)
        .send({
          type: 'error',
          message: 'You must re-submit your password to complete this action.'
        })
    }
    const { _id } = req.user
    const user = await Users.findOne({ _id })
    if (!user) {
      return res
        .code(200)
        .send({
          type: 'error',
          message: 'Server Error. Failed to find user information, failed to delete'
        })
    }

    const pass = await bcrypt.compare(req.body.pass, user.pass)
    if (!pass) { return res.code(200).send({ type: 'error', message: 'Invalid password' }) }

    const deleteStatus = await Users.findOneAndDelete({ _id })
    if (!deleteStatus) {
      return res
        .code(200)
        .send({
          type: 'error',
          message: 'Server Error. Failed to delete user'
        })
    }
    res.send({ message: 'User deleted successfully' })
  }

  // logout handler
  const logout = async (req, res) => {
    await deleteTokenRecord(req)
      .then(() => res.code(200).send({ type: 'success', message: 'You are now logged out.' }))
      .catch(() => res.code(200).send({ type: 'error', message: 'Server error! Failed to logout.' }))
  }

  // logout all tokens except current token
  const logouts = async (req, res) => {
    await deleteTokensRecord(req)
      .then(() => res.code(200).send({ type: 'success', message: 'You are now logged out on all other devices' }))
      .catch(() => res.code(200).send({ type: 'error', message: 'Server error! Failed to logout on other devices' }))
  }

  const logoutSession = async (req, res) => { }

  const session = async (req, res) => {
    const record = await readTokenRecord(req)
    if (!record) return res.code(200).send({ type: 'error', message: 'Session not found' })
    return res.send({ type: 'success', message: 'Session found', data: { ..._.pick(record, ['_id', 'user_id', 'created_at', 'device', 'ip']), is_current: record.token === req.bearerToken } })
  }

  const sessions = async (req, res) => {
    const records = await readTokenRecords(req)
    if (!records) return res.code(200).send({ type: 'error', message: 'Sessions not found' })
    const result = []
    records.docs.forEach(r => result.push({ ..._.pick(r, ['_id', 'user_id', 'created_at', 'device', 'ip']), is_current: r.token === req.bearerToken }))
    if (res.sent === false) return res.send({ type: 'success', message: 'Sessions found', data: result })
  }

  const allSessions = async (req, res) => {
    const records = await readAllTokenRecords(req)
    if (!records) return res.code(200).send({ type: 'error', message: 'Sessions not found' })
    const result = []
    records.forEach(r => result.push({ ..._.pick(r, ['_id', 'user_id', 'created_at', 'device', 'ip']), is_current: r.token === req.bearerToken }))
    return res.send({ type: 'success', message: 'Sessions found', data: result })
  }

  return {
    register,
    gschema,
    rschema,
    rdschema,
    login,
    auth,
    sessionSchema,
    read,
    reads,
    update,
    delete: remove,
    logout,
    logouts,
    logoutSession,
    session,
    sessions,
    allSessions
  }
}
