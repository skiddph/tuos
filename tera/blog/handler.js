module.exports = function (app) {
    const auth = {preValidation: [app.authenticate]}

    return {
        auth
    }
}
