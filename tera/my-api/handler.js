const codexecs = require('./codexecs')
const axios = require('axios')
const USID = require('usid')
const _ = require('lodash')

module.exports = function (app) {
    const Model = app.mongoose.models.MyAPI

    const auth = { preValidation: [ app.authenticate ] }

    const codexec = async (req, res) => {
        const user_id = req.params.id
        const codename = req.params.name

        const find = user_id.match(/^[0-9a-fA-F]{24}$/) ? { _id: user_id } : { author_username: user_id }
        const api = await Model.findOne({...find, codename: codename})
        if (!api) return res.code(200).send({ type: 'error', message: "API not found" })

        const code = String(api.codebody || "")

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

    // Prevent actions/changes from frequent request
    const spamGuard = async (req, time = 5000) => {
        return await Model.find({ author_id: req.user._id, updated_at: { $gte: Date.now() - time } })
            .limit(1)
            .then(e => e.length)
            .catch(() => 0)
    }

    // Create API handler
    const create = async (req, res) => {
        const spam = await spamGuard(req, 10000)
        if (spam == 1) return res.code(429).send({ type: 'error', message: "Please wait a moment before creating API again." })

        const data = _.pick(req.body, [ 'codename', 'codebody' ])

        const find = {author_id: req.user._id, codename: data.codename}
        const check = await Model.findOne(find)
        if(check) return res.code(200).send({ type: 'error', message: "Codename already exists" })

        const tstamp = Date.now()
        data[ 'author_id' ] = req.user._id
        data[ 'author_username' ] = req.user.user
        data[ 'created_at' ] = tstamp
        data[ 'updated_at' ] = tstamp

        const api = new Model(data)
        await api.save()
            .then(() =>
                res.code(200).send({
                    status: "success",
                    message: "API created successfully."
                })
            )
            .catch(() =>
                res.code(200).send({
                    type: 'error',
                    message:
                        "Failed to create API. Try again later",
                })
            )
    }

    // Reads single API handler
    const read = async (req, res) => {
        const id = req.params.id
        const find = id.match(/^[0-9a-fA-F]{24}$/) ? { _id: id } : { codename: id }

        const api = await Model.findOne({ ...find, author_id: req.user._id })
        if (!api) return res.code(200).send({ type: 'error', message: "API not found" })

        res.code(200).send({
            status: "success",
            message: "API found successfully.",
            data: api
        })
    }

    // Reads many API handler
    const reads = async (req, res) => {
        const page = req.params.page || 1
        const items = req.params.items || 10
        const user_id = req.user._id
        const api = await Model.paginate({ author_id: user_id }, { page: page, limit: items })
        res.send({
            type: "success",
            message: `${api.docs.length} blog posts found.`,
            data: {
                page,
                items,
                size: api.docs.length,
                data: api.docs
            },
        });
    }

    // Update API handler
    const update = async (req, res) => {
        const spam = await spamGuard(req, 5000)
        if (spam == 1) return res.code(429).send({ type: 'error', message: "Please wait a moment before making changes to your API" })

        const id = req.params.id
        const data = _.pick(req.body, [ 'codename', 'codebody' ])

        const find = id.match(/^[0-9a-fA-F]{24}$/) ? { _id: id } : { codename: id }
        const api = await Model.findOne({ ...find, author_id: req.user._id })
        if (!api) return res.code(200).send({ type: 'error', message: "API not found" })

        api.codename = data.codename || api.codename
        api.codebody = data.codebody || api.codebody
        api.author_username = req.user.user
        api.updated_at = Date.now()

        await api.save()
            .then(() =>
                res.code(200).send({
                    status: "success",
                    message: "API updated successfully."
                })
            )
            .catch(() =>
                res.code(200).send({
                    type: 'error',
                    message:
                        "Failed to update API. Try again later",
                })
            )
    }

    // Deletes single API handler
    const del = async (req, res) => {
        const id = req.params.id
        const find = id.match(/^[0-9a-fA-F]{24}$/) ? { _id: id } : { codename: id }

        const api = await Model.findOne({ ...find, author_id: req.user._id })
        if (!api) return res.code(200).send({ type: 'error', message: "API not found" })

        await api.deleteOne()
            .then(() =>
                res.code(200).send({
                    status: "success",
                    message: "API deleted successfully."
                })
            )
            .catch(() =>
                res.code(200).send({
                    type: 'error',
                    message: "Failed to delete API. Try again later",
                })
            )
    }

    // Deletes all APIs handler
    const delAll = async (req, res) => {
        const user_id = req.user._id
        await Model.deleteMany({ author_id: user_id })
            .then(() =>
                res.code(200).send({
                    status: "success",
                    message: "All APIs deleted successfully."
                })
            )
            .catch(() =>
                res.code(200).send({
                    type: 'error',
                    message:
                        "Failed to delete all APIs. Try again later",
                })
            )
    }

    return {
        auth,
        codexec,
        create,
        read,
        reads,
        update,
        delete: del,
        deletes: delAll
    }
}