const TokenHandler = (Tokens) => {
    const createTokenRecord = async (req, token) => {
        const data = {token}
        data['device'] = req.headers['user-agent']
        data['ip'] = req.headers['x-forwarded-for'] || req.socket.remoteAddress || "127.0.0.1"
        data['created_at'] = Date.now()
        const record = new Tokens(data)
        return await record.save()
    }

    return {
        createTokenRecord
    }
}
module.exports = TokenHandler