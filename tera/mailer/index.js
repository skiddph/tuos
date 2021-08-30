const fp = require('fastify-plugin')
const nodemailer = require('nodemailer')

const mailer = async (fastify, options, next) => {
  const projectOptsDefaults = options?.mailer?.defaults || {
    secure: process.env.MAILER_SECURE === '1',
    host: process.env.MAILER_HOST,
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASS
    }
  } || {}

  const projectOptsTransport = options?.mailer?.transport || {}

  const transporter = nodemailer
    .createTransport(projectOptsDefaults, projectOptsTransport)

  // returns true if authenticated by smtp server
  const verifyDefaultCallback = error => !error

  const send = async mailOptions => await transporter.sendMail(mailOptions)
  const verify = (callback = verifyDefaultCallback) => transporter.verify(callback)

  fastify.decorate(options.namespace || 'mailer', {
    send,
    verify,
    transporter
  })

  next()
}

module.exports = {
  plugin: fp(mailer, {
    fastify: '>=2.0.0',
    name: 'tuos-mailer'
  })
}
