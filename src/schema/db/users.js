
const mongoose = require('mongoose')

const UsersSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		min: [2, "Minimum of 2 characters"],
		max: [50, "Maximum of 50 characters"]
	},
	user: {
		type: String,
		required: true,
		min: [3, "Minimum of 3 characters"],
		max: [255, "Maximum of 255 characters"],
		unique: true
	},
	pass: {
		type: String,
		required: true,
		min: [6, "Minimum of 6 characters"]
	}
})

module.exports = mongoose.model('Users', UsersSchema)