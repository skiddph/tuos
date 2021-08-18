const mongoose = require('mongoose')
const paginate = require('mongoose-paginate-v2');

const TokensSchema = new mongoose.Schema({
	token: { type: String, required: true, unique: true },
	user_id: { type: String, required: true},
	ip: { type: String, required: true},
    device: { type: String, required: true },
	created_at: { type: Number, required: true },
}, { timestamp: true })

TokensSchema.plugin(paginate);
module.exports =  mongoose.model( "Tokens", TokensSchema)