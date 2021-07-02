module.exports = function (fastify) {
  const len = 24

  const uuidDefault = (req, res) => {
    res.send({ id: fastify.usid.uuid(len) })
  }

  const uuidCustomLength = (req, res) => {
    res.send({ id: fastify.usid.uuid(req.params.length || len) })
  }

  return {
    uuid: {
      default: uuidDefault,
      custom: uuidCustomLength
    }
  }
}