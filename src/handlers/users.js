const _ = require('lodash');
const Joi = require('joi');
const bcrypt = require('bcrypt')
module.exports = function (fastify) {
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
                name: { type: 'string' },
                created_at: { type: 'number' }
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
              properties: readOneSchema.schema.response[200].properties.data.properties
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
  const readOneByUserSchema = {
    ...readOneSchema,
    schema: {
      params: {
        type: 'object',
        properties: {
          user: { type: 'string' }
        }
      },
      ...readOneSchema.response
    }
  }
  const readOneByIdSchema = {
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        }
      },
      ...readOneSchema.response
    }
  }
  const readManySchema = {
    schema: {
      params: {
        type: 'object',
        properties: {
          page: { type: 'number', default: 1 },
          items: { type: 'number', default: 20 }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            type: { type: 'string', default: "success" },
            message: { type: 'string' },
            data: {
              type: 'array',
              items: {
                type: 'object',
                properties: readOneSchema.schema.response[200].properties.data.properties
              }
            },
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
            message: { type: 'string', default: "Server Error" },
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
    user.created_at = Date.now()
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
  const readMany = async (req, res) => {
    const page = req.params.page
    const items = req.params.items
    const users = await fastify.mongoose.Users.paginate({}, { page: page, limit: items })
    console.log(users.docs)
    res.send({
      type: 'success',
      message: `${users.docs.length} users found.`,
      data: users.docs
    })
  }
  return {
    create,
    createSchema,
    loginSchema,
    readOneSchema,
    readOneByUserSchema,
    readOneByIdSchema,
    readMany,
    readManySchema,
    readOneById,
    login,
    authenticate,
    readOneByUser,
  }
}