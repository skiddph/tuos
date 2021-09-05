const mongoose = require('mongoose')
const paginate = require('mongoose-paginate-v2')

const Classroom = new mongoose.Schema({
  alternate_id: { type: String, unique: true, required: true }, // unique id for the quiz
  teacher_id: String,
  teacher_name: String,
  privacy: String, // default:public (public | private | secret)
  title: String,
  description: String,
  created_at: Number,
  updated_at: Number,
  status: String, // published, unpublished, or banned
  theme: String, // UI Theme (default: default) (theme must be handled by the client app)
  tags: [String], // used for categorizing classroom
  max_allowed: Number, // max allowed students to be approved default: 100
  approved: Number, // count
  rejected: Number, // count
  banned: Number // count
}, { timestamp: true })

Classroom.plugin(paginate)

module.exports = mongoose.model('Classroom', Classroom)
