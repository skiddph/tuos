const mongoose = require('mongoose')

const UsersSchema = new mongoose.Schema({
	id: String,
	name: String,
	user: String,
	hash: String
})

module.exports = mongoose.model('Users',UsersSchema)