const codexecs = require('./codexecs')
const axios = require('axios')
const USID = require('usid')

module.exports = function (app) {
    const codexec = async (req,res) => {
        const code = `
            __RESPONSE__.send({timestamp:__ID__})
        `
        const e = await codexecs(code, {
            require: require,
            __REQUEST__: req,
            __RESPONSE__: res,
            __AXIOS__: axios,
            __ID__: (new USID()).uuid()
        })
            .catch(e => ({ type: 'error', message: e.message || "Unhandled ERROR" }))

        if (res.sent === false) res.send(e)
    }

    return {
        codexec
    }
}