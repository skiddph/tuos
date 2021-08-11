module.exports = function (app, options) {
    const auth = {preValidation: [app.authenticate]}

    return {
        auth
    }
}
