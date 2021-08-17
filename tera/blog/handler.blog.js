const _ = require('lodash')
const USID = require('usid')

module.exports = function (app) {
    const Model = app.mongoose.models.Blog
    const writeSchema = {
    }

    const schema = {
        write: writeSchema
    }
    const usid = new USID()
    const alternateID = (title) => {
        return String(title)
            .toLowerCase()
            .replace("  ", "")
            .replace("  ", "")
            .replace(/[^a-z0-9]+/g, '-')
            .substr(0, 36)
            + `-${usid.rand(12)}`
    }

    // Prevent actions/changes from frequent request
    const spamGuard = async (req, time = 5) => {
        return await Model.find({ author_id: req.user._id, updated_at: { $gte: Date.now() - (time * 1000) } })
            .limit(1)
            .then(e => e.length)
            .catch(() => 0)
    }

    // create blog post handler
    const write = async (req, res) => {
        const spam = await spamGuard(req, 10)
        if (spam == 1) return res.code(429).send({ type: 'error', message: "Please wait a moment before creating blog post again." })

        const data = _.pick(req.body, [ 'title', 'description', 'body' ])
        const tstamp = Date.now()
        data[ 'alternate_id' ] = alternateID(data.title)
        data[ 'author_id' ] = req.user._id
        data[ 'author_name' ] = req.user.name || "Anonymous"
        data[ 'created_at' ] = tstamp
        data[ 'updated_at' ] = tstamp
        const blog = new Model(data)
        await blog.save()
            .then(() =>
                res.code(200).send({
                    status: "success",
                    message: "Blog post created successfully."
                })
            )
            .catch(() =>
                res.code(200).send({
                    type: 'error',
                    message:
                        "Failed to create blog post. Try again later",
                })
            )
    }

    // update blog post handler
    const update = async (req, res) => {
        const spam = await spamGuard(req, 5)
        if (spam == 1) return res.code(429).send({ type: 'error', message: "Please wait a moment before updating blog post again." })

        const blog_id = req.params.blog_id
        const data = _.pick(req.body, [ 'title', 'description', 'body' ])

        const blog = await Model.findOne({ _id: blog_id })
        if (!blog) return res.code(200).send({ type: 'error', message: "Blog post not found" })
        if (blog.author_id != req.user._id) return res.code(200).send({ type: 'error', message: "You don't have permission to update this blog post." })

        blog.body = data.body || blog.body
        blog.title = data.title || blog.title
        blog.alternate_id = alternateID(data.title || blog.title)
        blog.description = data.description || blog.description
        blog.author_name = req.user.name || blog.author_name || "Anonymous"
        blog.updated_at = Date.now()

        await blog.save()
            .then(() =>
                res.code(200).send({
                    status: "success",
                    message: "Blog post updated successfully."
                })
            )
            .catch(() =>
                res.code(200).send({
                    type: 'error',
                    message:
                        "Failed to update blog post. Try again later",
                })
            )
    }

    // Delete blog post handler
    const del = async (req, res) => {
        const blog_id = req.params.blog_id
        const blog = await Model.findOne({ _id: blog_id })
        if (!blog) return res.code(200).send({ type: 'error', message: "Blog post not found" })
        if (blog.author_id != req.user._id) return res.code(200).send({ type: 'error', message: "You don't have permission to delete this blog post." })

        await blog.deleteOne()
            .then(() =>
                res.code(200).send({
                    status: "success",
                    message: "Blog post deleted successfully."
                })
            )
            .catch(() =>
                res.code(200).send({
                    type: 'error',
                    message:
                        "Failed to delete blog post. Try again later",
                })
            )
    }

    // Delete all blog post handler
    const delAll = async (req, res) => {
        const user_id = req.user._id
        await Model.deleteMany({ author_id: user_id })
            .then(() =>
                res.code(200).send({
                    status: "success",
                    message: "All blog posts deleted successfully."
                })
            )
            .catch(() =>
                res.code(200).send({
                    type: 'error',
                    message:
                        "Failed to delete all blog posts. Try again later",
                })
            )
    }

    // read single blog post handler
    const read = async (req, res) => {
        const blog_id = req.params.blog_id
        const blog = blog_id.match(/^[0-9a-fA-F]{24}$/) ? await Model.findOne({ _id: blog_id }): await Model.findOne({ alternate_id: blog_id })
        
        if (!blog) return res.code(200).send({ type: 'error', message: "Blog post not found" })

        res.code(200).send({
            status: "success",
            message: "Blog post found successfully.",
            data: blog
        })
    }

    // reads 1 or many blog post handler
    const reads = async (req, res) => {
        const page = req.params.page || 1
        const items = req.params.items || 10

        const blogs = await Model.paginate({}, { page: page, limit: items })
        res.send({
			type: "success",
			message: `${blogs.docs.length} blog posts found.`,
			data: {
                page,
                items,
                size: blogs.docs.length,
                data: blogs.docs
            },
		});
    }

    return {
        read,
        reads,
        write,
        update,
        delete: del,
        deletes: delAll,
        schema
    }
}