var express = require('express');
var router = express.Router();
var request = require('sync-request');
var WishModel = require('../models/whishlist')

/* GET newmovies */
router.get('/new-movies', function(req, res, next) {
  var apiKey = process.env.TMDB_API
  var apiRequest = request('GET', (`https://api.themoviedb.org/3/discover/movie/?api_key=${apiKey}&language=fr&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`) )
  apiRequest = JSON.parse(apiRequest.getBody())
  datas = apiRequest.results.map(function(movie) {
    // cut the text
    if (movie.overview.length >= 80) {
      var shortOverview = movie.overview.slice(0, 80) + '...'
    } else {
      var shortOverview = movie.overview
    }
    return {
      popularity: movie.popularity,
      vote_count: movie.vote_count,
      id: movie.id,      
      backdrop_path: 'http://image.tmdb.org/t/p/w300/' + movie.backdrop_path,      
      title: movie.title,
      vote_average: movie.vote_average, 
      overview: shortOverview
    }
  })
  res.json(datas);
});

/* POST wishlist. */
router.post('/wishlist/:id', async function(req, res, next) {
  var movieId = req.params.id
  var apiKey = process.env.TMDB_API
  var apiRequest = request('GET', (`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=fr`) )
  apiRequest = JSON.parse(apiRequest.getBody())

  var imgConfig = request('GET', (`https://api.themoviedb.org/3/configuration?api_key=${apiKey}`))
  imgConfig = JSON.parse(imgConfig.getBody())
  var backDrop = imgConfig.images.secure_base_url + imgConfig.images.backdrop_sizes[0] + apiRequest.backdrop_path

  var newMovie = new WishModel({
    movieId: req.params.id,
    title: apiRequest.title,
    backdrop: backDrop,
  })
  var newMovie = await newMovie.save()
  res.json({result: true});
});


/* DELETE wishlist. */
router.delete('/wishlist/:id', async function(req, res, next) {
  console.log('ok route DELETE')
  var movieId = req.params.id
  await WishModel.deleteOne({
    movieId: movieId
  })
  console.log('ok delete')
  res.json({result: true});
});

/* GET wishlist. */
router.get('/wishlist', async function(req, res, next) {
  myWishList = await WishModel.find()
  res.json(myWishList);
});





// keep those lines at the end
module.exports = router;
