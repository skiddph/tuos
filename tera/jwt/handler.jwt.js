const JwtHandler = (app) => {
  const { Tokens } = app.bootstrap.plugins.auth.models

  const authenticate = async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1]
      const userId = app.jwt.decode(token)._id
      req.bearerToken = token

      const record = await Tokens.findOne({ user_id: userId, token })
      if (!record) return res.status(401).send({ type: 'error', message: 'Unauthorized' })

      app.jwt.verify(token, null, (err, decoded) => {
        if (err) return res.status(401).send({ type: 'error', message: 'Unauthorized' })
        req.user = decoded
        next()
      })
    } catch (e) {
      return res.status(401).send({ type: 'error', message: 'Unauthorized' })
    }
  }

  const preAuth = async (req, res, next) => {
    try {
      req.isAuthenticated = false

      const token = req.headers.authorization.split(' ')[1]
      req.bearerToken = token

      const userId = app.jwt.decode(token)._id
      const record = await Tokens.findOne({ user_id: userId, token })
      if (!record) return next()

      app.jwt.verify(token, null, (err, decoded) => {
        if (!err) {
          req.isAuthenticated = true
          req.isAdmin = decoded.role === 'admin'
          req.user = decoded
        }

        next()
      })
    } catch (e) {
      next()
    }
  }

  return {
    authenticate,
    preAuth
  }
}

module.exports = JwtHandler
