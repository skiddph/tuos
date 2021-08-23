const JwtHandler = (app) => {
  const { Tokens } = app.mongoose.models

  const getToken = (req) => req.headers.authorization.split(' ')[1]

  const authenticate = async (req, res, next) => {
    const token = getToken(req)
    const userId = app.jwt.decode(token)._id

    req.bearerToken = token

    const record = await Tokens.findOne({ user_id: userId, token })
    if (!record) return res.status(401).send({ type: 'error', message: 'Unauthorized' })

    app.jwt.verify(token, null, (err, decoded) => {
      if (err) return res.status(401).send({ type: 'error', message: 'Unauthorized' })
      req.user = decoded
      next()
    })
  }

  return {
    authenticate
  }
}

module.exports = JwtHandler
