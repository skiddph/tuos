const mongoose = require('mongoose')
const paginate = require('mongoose-paginate-v2')

module.exports = () => {
  const BlogSchema = new mongoose.Schema({
    alternate_id: { type: String, unique: true, required: true },
    author_id: { type: String, required: true },
    author_name: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: false },
    body: { type: String, required: true },
    comments_count: { type: Number, required: false },
    vote_count: { type: Number, required: false },
    created_at: { type: Number, required: true },
    updated_at: { type: Number, required: false }
  }, { timestamp: true })

  BlogSchema.plugin(paginate)
  return mongoose.model('Blog', BlogSchema)
}
