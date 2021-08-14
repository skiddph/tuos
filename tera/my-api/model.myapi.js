const mongoose = require('mongoose')
const paginate = require('mongoose-paginate-v2');

const MyAPISchema = new mongoose.Schema({
    codename: { type: String, required: true},
    codebody: { type: String, required: true },
    author_id: { type: String, required: true },
    author_username: { type: String, required: true },
    created_at: { type: Number, required: true },
    updated_at: { type: Number, required: false },
}, { timestamp: true })

MyAPISchema.plugin(paginate);

module.exports = mongoose.model("MyAPI", MyAPISchema)