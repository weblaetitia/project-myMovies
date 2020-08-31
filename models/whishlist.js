var mongoose = require('mongoose')

// Schema
var wishSchema = mongoose.Schema({
    movieId: Number,
    title: String,
    backdrop: String,
})

// model
var WishModel = mongoose.model('wishes', wishSchema)

// export models 
module.exports = WishModel