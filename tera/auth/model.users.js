const mongoose = require('mongoose')
const paginate = require('mongoose-paginate-v2');

const UsersSchema = new mongoose.Schema({
	name: { type: String, required: true, },
	user: { type: String, required: true, unique: true },
	pass: { type: String, required: true, },
	created_at: { type: Number, required: true },
	phone: { type: String, required: false },
	countryCode: { type: String, required: false },
	lon: { type: Number, required: false },
	lat: { type: Number, required: false },
	phoneVerified: { type: Boolean, required: false },
	email: { type: String, required: false },
	emailVerified: { type: Boolean, required: false },
	defaultPhoto: { type: String, required: false }
}, { timestamp: true })

UsersSchema.plugin(paginate);
module.exports =  mongoose.model( "Users", UsersSchema)