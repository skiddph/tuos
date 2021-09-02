module.exports = function (app) {
  // const Model = app.bootstrap.plugins.blog.models.Form
  const schema = {
    create: {},
    update: {},
    delete: {},
    list: {},
    read: {}
  }
  const create = async (req, res) => {}
  const update = async (req, res) => {}
  const remove = async (req, res) => {}
  const get = async (req, res) => {}
  const list = async (req, res) => {}

  return {
    create,
    update,
    remove,
    get,
    list,
    schema
  }
}
