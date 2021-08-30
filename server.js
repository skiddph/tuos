require('dotenv').config()
const Bootstrap = require('./bootstrap')

const bootstrap = new Bootstrap({
  plugins: {
    primary: ['jwt', 'misc', 'ratelimit'],
    mode: 'all',
    strict: false
  }
})

bootstrap.init()
