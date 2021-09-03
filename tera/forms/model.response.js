const mongoose = require('mongoose')
const paginate = require('mongoose-paginate-v2')

module.exports = () => {
  const FormResponse = new mongoose.Schema({
    author_id: { type: String, required: true },
    author_name: { type: String, required: true },
    created_at: Number,
    updated_at: Number,
    form_id: String,
    form_alternate_id: String,
    graded: Boolean, // If all questions are graded
    score: Number, // total scores of all questions
    accumulated_time: Number, // total time spent on all questions
    answers: [{
      id: String, // question id
      answer: String, // answer (applicable on single|manual type question)
      answers: [String], // string of answers (applicable on multiple)
      accumulated_time: Number // time spent in this particular question
    }],
    scores: [{
      id: String, // question number
      graded: Boolean, // automatically set to true if the question is not manually graded or else false
      score: Number // score of the question
    }]
  }, { timestamp: true })

  FormResponse.plugin(paginate)
  return mongoose.model('FormResponse', FormResponse)
}
