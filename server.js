require('dotenv').config()
const bootstrap = require('./bootstrap')

bootstrap({
  token: process.env.JWT_TOKEN || 'tuos_default_jwt_token',
  mongo: process.env.MONGO_DIRECT || 'mongodb://localhost:27017/tuos',
  mailer: {
    secure: process.env.MAILER_SECURE === '1',
    host: process.env.MAILER_HOST,
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASS
    }
  },
  plugins: {
    excluded: [],
    primary: ['jwt']
  }
})
