const _ = require('lodash');
const Joi = require('joi');
const bcrypt = require('bcrypt')
module.exports = function (fastify) {
  const createSchema = {
    schema: {
      body: {
        type: 'object',
        required: ['user', 'pass', 'name'],
        properties: {
          user: { type: 'string' },
          name: { type: 'string' },
          pass: { type: 'string' }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            type: { type: 'string', default: "success" },
            message: { type: 'string' },
            data: {
              type: 'object',
              properties: {
                _id: { type: 'string' },
                user: { type: 'string' },
                name: { type: 'string' }
              }
            },
            token: { type: 'string' }
          },
        },
        400: {
          type: 'object',
          properties: {
            type: { type: 'string', default: "error" },
            message: { type: 'string' },
          }
        },
        500: {
          type: 'object',
          properties: {
            type: { type: 'string', default: "error" },
            message: { type: 'string' },
          }
        }
      }
    }
  }
  const loginSchema = {
    schema: {
      body: {
        type: 'object',
        required: ['user', 'pass'],
        properties: {
          user: { type: 'string' },
          pass: { type: 'string' }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            type: { type: 'string', default: "success" },
            message: { type: 'string' },
            token: { type: 'string' }
          },
        },
        404: {
          type: 'object',
          properties: {
            type: { type: 'string', default: "error" },
            message: { type: 'string' },
          }
        },
        400: {
          type: 'object',
          properties: {
            type: { type: 'string', default: "error" },
            message: { type: 'string' },
          }
        },
        500: {
          type: 'object',
          properties: {
            type: { type: 'string', default: "error" },
            message: { type: 'string' },
          }
        }
      }
    }
  }
  const readOneSchema = {
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            type: { type: 'string', default: "success" },
            message: { type: 'string', default: "User found" },
            data: {
              type: 'object',
              properties: {
                _id: { type: 'string' },
                user: { type: 'string' },
                name: { type: 'string' }
              }
            },
          }
        },
        404: {
          type: 'object',
          properties: {
            type: { type: 'string', default: "error" },
            message: { type: 'string', default: "User not found" },
          }
        },
        500: {
          type: 'object',
          properties: {
            type: { type: 'string', default: "error" },
            message: { type: 'string' },
          }
        }
      }
    }
  }
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
  const newJWTToken = (payload) => {
    return fastify.jwt.sign(_.pick(payload, ['_id', 'name', 'user']))
  }
  const create = async (req, res) => {
    const { error } = validateUser(req.body)
    if (error) return res.code(400).send({ type: 'error', message: error.details[0].message })

    const duplicate = await fastify.mongoose.Users.findOne({ user: req.body.user })
    if ("duplicate:", Boolean(duplicate)) return res.code(400).send({ type: 'error', message: "Username already exists." })

    const user = new fastify.mongoose.Users(req.body)
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(req.body.pass, salt)
    user.pass = hashed

    user.save()
      .then((u) => {
        console.log(u)
        res.send({
          type: 'success',
          message: "User successfully created.",
          data: u,
          token: newJWTToken(u)
        })
      })
      .catch(() => res.code(500).send({
        type: 'error',
        message: "Failed to register. Please contact your administrator to fix this error"
      }))

  }
  const login = async (req, res) => {
    const { error } = validateCred(req.body)
    if (error) return res.code(400).send({ type: 'error', message: error.details[0].message })

    const user = await fastify.mongoose.Users.findOne({ user: req.body.user })
    if (!user) return res.code(400).send({ type: 'error', message: 'Invalid username or password' })
    const pass = await bcrypt.compare(req.body.pass, user.pass)
    if (!pass) return res.code(400).send({ type: 'error', message: 'Invalid username or password' })

    res.send({
      status: "success",
      message: "You are now logged in.",
      token: newJWTToken(user)
    })
  }
  const authenticate = () => ({ preValidation: [fastify.authenticate] })
  const readOneByUser = async (req, res) => {
    const user = await fastify.mongoose.Users.findOne({ user: req.params.user })
    if (!user) return res.code(404).send({})
    res.send({ data: user })
  }
  const readOneById = async (req, res) => {
    const user = await fastify.mongoose.Users.findOne({ _id: req.params.id })
    if (!user) return res.code(404).send({})
    res.send({ data: user })
  }
  return {
    create,
    createSchema,
    loginSchema,
    readOneSchema,
    readOneById,
    login,
    authenticate,
    readOneByUser,
  }
}