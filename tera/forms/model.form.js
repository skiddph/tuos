const mongoose = require('mongoose')
const paginate = require('mongoose-paginate-v2')

module.exports = () => {
  const Form = new mongoose.Schema({
    alternate_id: { type: String, unique: true, required: true }, // unique id for the quiz
    author_id: { type: String, required: true },
    author_name: { type: String, required: true },
    use_as: String, // public|class|private
    origin_id: String, // id of the quiz that this quiz is based on
    class_id: String, // if associated with a classroom
    type: String, // form type (quiz|survey|test)
    title: String,
    description: String,
    created_at: Number,
    updated_at: Number,
    has_score: Boolean, // form needs to be scored (applicable on quiz|test)
    max_attempt: Number, // max number of attempts allowed (applicable on quiz|test) (default: 1)
    authenticated: Boolean, // authenticated users only (default: false)
    limit: Number, // max allowed accumulated_time for answering in milliseconds (default: 0)
    due: Number, // due date for answering the form (is timestamp format) (default: 0)
    theme: String, // UI Theme (default: default) (theme must be handled by the client)
    tags: [String], // used for categorizing forms
    allow_answer_edit: Boolean, // allow editing of answers after submission(default: false)
    total_points: Number, // total points that can be earn by answering the form (applicable on quiz|test) (default: 0)
    shuffle_choices: Boolean, // default shuffle choices in every question (default: true)
    questions: [{
      id: Number,
      question: String,
      type: String, // (single|multiple|manual)
      points: Number, // points for this specific question (applicable on quiz|test) (default: 1)
      correct_answer: String, // applicable on single|manual type
      correct_answers: [String], // applicable on multiple type
      choices: [String], // applicable on single|multiple type
      manual_checking: Boolean, // ignore `correct_answer` field. applicable on manual type (applicable on quiz|test form type)
      shuffle_choices: Boolean, // overwrite shuffle_choices in this question (applicable on multiple type)
      case_sensitive: Boolean // applicable on manual type
    }]
  }, { timestamp: true })

  Form.plugin(paginate)
  return mongoose.model('Form', Form)
}
