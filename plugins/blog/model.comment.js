const mongoose = require('mongoose')
const paginate = require('mongoose-paginate-v2')

module.exports = () => {
  const BlogCommentSchema = new mongoose.Schema({
    unified_id: { type: String, required: true },
    blog_id: { type: String, required: true },
    author_id: { type: String, required: true },
    author_name: { type: String, required: true },
    comment: { type: String, required: true },
    created_at: { type: Number, required: true },
    updated_at: { type: Number, required: true }
  }, { timestamp: true })

  BlogCommentSchema.plugin(paginate)
  return mongoose.model('BlogComment', BlogCommentSchema)
}
