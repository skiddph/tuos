const mongoose = require('mongoose')
const paginate = require('mongoose-paginate-v2')

const Student = new mongoose.Schema({
  student_id: String,
  student_name: String,
  class_id: String,
  created_at: Number,
  updated_at: Number,
  registered_by: String, // student | teacher | admin
  status: String // registration status (pending|approved|rejected|banned)
}, { timestamp: true })

Student.plugin(paginate)

module.exports = mongoose.model('Student', Student)
