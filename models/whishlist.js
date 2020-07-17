var mongoose = require('mongoose')

// Schema
var wishSchema = mongoose.Schema({
    tmdb_id: Number,
    title: String,
    backdrop: String,
})

// model
var WishModel = mongoose.model('wishes', wishSchema)

// export models 
module.exports = WishModel