const mongoose = require('mongoose')
const paginate = require('mongoose-paginate-v2');

module.exports = () => {
    const BlogSchema = new mongoose.Schema({
        author_id: { type: String, required: true },
        author_name: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: false },
        body: { type: String, required: true },
        created_at: { type: Number, required: true },
    }, { timestamp: true })

    BlogSchema.plugin(paginate);
    return mongoose.model("Blog", BlogSchema)
}