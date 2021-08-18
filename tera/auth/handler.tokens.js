const _ = require('lodash')
const TokenHandler = (app) => {
    const { Tokens } = app.mongoose.models

    // create current user token record
    const createTokenRecord = async (req, token, user_id) => {
        const data = { token }
        data[ 'user_id' ] = user_id
        data[ 'device' ] = req.headers[ 'user-agent' ]
        data[ 'ip' ] = req.headers[ 'x-forwarded-for' ] || req.socket.remoteAddress || "127.0.0.1"
        data[ 'created_at' ] = Date.now()
        const record = new Tokens(data)
        return await record.save()
    }

    // Get token from authorization header in request
    const getTokenFromRequest = async (req) => req.headers[ 'authorization' ].split(' ')[ 1 ]

    // delete current token record
    const deleteTokenRecord = async (req) => await Tokens.findOneAndDelete({ user_id: req.user._id, token: getTokenFromRequest(req) })

    // deletes all users token record except current user
    const deleteTokensRecord = async (req) => await Tokens.remove({ user_id: req.user._id, token: { $ne: getTokenFromRequest(req) } })

    // create a new token
    const newJWTToken = (payload) => String(app.jwt.sign({ ..._.pick(payload, ([ "_id", "name", "user" ])) }))

    return {
        newJWTToken,
        createTokenRecord,
        deleteTokenRecord,
        deleteTokensRecord
    }
}
module.exports = TokenHandler