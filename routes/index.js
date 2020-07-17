var express = require('express');
var router = express.Router();
var request = require('sync-request');
var WishModel = require('../models/whishlist')

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });
});

/* GET newmovies */
router.get('/new-movies', function(req, res, next) {
  var apiKey = process.env.TMDB_API
  var apiRequest = request('GET', (`https://api.themoviedb.org/3/discover/movie/?api_key=${apiKey}&language=fr&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`) )
  apiRequest = JSON.parse(apiRequest.getBody())


  res.json(apiRequest);
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
    tmdb_id: req.params.id,
    title: apiRequest.title,
    backdrop: backDrop,
  })

  var newMovie = await newMovie.save()

  console.log(newMovie)

  res.json({result: true});
});


/* DELETE wishlist. */
router.delete('/wishlist/:id', async function(req, res, next) {
  var movieId = req.params.id

  await WishModel.deleteOne({
    tmdb_id: movieId
  })

  res.json({result: true});
});

/* GET wishlist. */
router.get('/wishlist/', async function(req, res, next) {

  myWishList = await WishModel.find()

  res.json(myWishList);
});





// keep those lines at the end
module.exports = router;