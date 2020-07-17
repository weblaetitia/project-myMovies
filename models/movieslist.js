var mongoose = require('mongoose')

// Schema
var MovieSchema = mongoose.Schema({
    title: String,
    overview: String, 
    backdrop: String,
    popularity: Number,
    vote_count: Number,
    vote_average:Number
})

// model
var MovieModel = mongoose.model('moviees', MovieSchema)

// export models 
module.exports = MovieModel