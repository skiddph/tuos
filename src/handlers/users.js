const _ = require('lodash');
const Joi = require('joi');
const bcrypt = require('bcrypt')
module.exports = function (fastify) {

  function validateUser(user) {
    const schema = Joi.object({
      name: Joi.string().pattern(new RegExp('^[a-zA-Z ]{2,50}$')).min(2).max(50).required(),
      user: Joi.string().alphanum().min(3).max(255).required(),
      pass: Joi.string().min(6).max(2048).required()
    })
    return schema.validate(user)
  }

  function validateCred(cred) {
    const schema = Joi.object({
      user: Joi.string().alphanum().min(3).max(255).required(),
      pass: Joi.string().min(6).max(2048).required()
    })
    return schema.validate(cred)
  }

  const create = async (req, res) => {

    const userdata = _.pick(req.body, ['user', "name", "pass"])

    const { error } = validateUser(userdata)

    if (error) return res.code(400).send({ type: 'error', message: error.details[0].message })

    const duplicate = await fastify.mongoose.Users.findOne({ user: userdata.user })
    if ("duplicate:", Boolean(duplicate)) return res.code(400).send({ type: 'error', message: "Username already exists." })


    const user = new fastify.mongoose.Users(userdata)
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(userdata.pass, salt)
    user.pass = hashed

    user.save()
      .then(() => res.send({
        type: 'success',
        message: "User successfully created.",
        data: _.pick(user, ['_id', "name", "user"])
      }))
      .catch(() => res.code(500).send({
        type: 'error',
        message: "Failed to register. Please contact your administrator to fix this error"
      }))


  }

  const login = async (req, res) => {
    const { error } = validateCred(req.body)
    if (error) return res.code(400).send({ type: 'error', message: error.details[0].message })

    let user = await fastify.mongoose.Users.findOne({ user: req.body.user })
    if (!user) return res.code(400).send({ type: 'error', message: 'Invalid username or password' })
    const pass = await bcrypt.compare(req.body.pass, user.pass)
    if (!pass) return res.code(400).send({ type: 'error', message: 'Invalid username or password' })


    const token = fastify.jwt.sign({ ..._.pick(user, ['_id', 'name', 'user']), admin: false })

    res.send({
      status: "success",
      message: "You are now logged in.",
      token
    })
  }

  const authenticate = { preValidation: [fastify.authenticate] }

  return {
    authenticate,
    create,
    login
  }
}