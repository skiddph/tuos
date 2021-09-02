module.exports = {
  appName: 'Tuos',
  appId: 'ml.skiddph.tuos',
  appVersion: 'v1.0.1',
  appAuthor: '',
  appAuthors: [
    ''
  ],
  appRepository: '',
  appAbout: '',
  appDescription: '',
  appLicense: '',
  fastify: {
    logger: true
  },
  plugins: {
    mongoose: {
      models: {}
    },
    static: {
      index: [
        'index.html',
        'README.md'
      ],
      dirs: [],
      fallbacks: {}
    }
  }
}