require('dotenv').config()
module.exports = {
  app: {
    name: 'Tuos',
    key: 'tuos',
    version: '1.0.0.dev.1',
    api_base: '/api',
    api_version: 'v1'
  },
  mongoose: { connect: process.env.MONGO_DIRECT || 'mongodb://localhost:27017/tuos' },
  jwt: { secret_token: process.env.JWT_TOKEN || 'jwt_default_token' },
  auth: {
    api_url: process.env.API_URL || 'http://localhost:8080',
    client_url: process.env.CLIENT_URL || 'http://localhost:8080',
    link_expiration: process.env.EMAIL_CODE_EXPIRATION
  },
  mailer: {
    // see https://nodemailer.com/
    transport: {
      secure: process.env.MAILER_SECURE === '1' || true,
      host: process.env.MAILER_HOST || 'smtp.gmail.com',
      port: process.env.MAILER_PORT || 465,
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS
      }
    },
    defaults: {
      from: process.env.MAILER_FROM
    }
  }
}
