
module.exports = async function (app, options, done) {
    const h = require('./handler')(app)

    const url = '/api/users-api/:id/:name'

    app.get(url, {}, h.codexec)
    app.post(url, {}, h.codexec)
    app.put(url, {}, h.codexec)
    app.delete(url, {}, h.codexec)

    done();
}
