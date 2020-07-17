import React, {useState, useEffect} from 'react'
import './App.css'
import { Navigation } from './components/Nav'
import { Movies } from './components/Movie'

import { Container, Row, ListGroupItem, Media } from 'reactstrap';


function App() {

  // Whishlist
  const [wishList, setWishList] = useState([])

  var handleClickAddMovie = async (title, image, movieId) => {
      // ajouer un film à la wish list
      await fetch('/wishlist/'+movieId, {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: 'movieId=' + movieId + '&title='+ title + '&image=' + image
      })
  }
  var handleClickDeleteMovie = (movie) => {
    setWishList(wishList.filter( (e) => (e !== movie)))
  }
  var deleteFromWl = (movie) => {
    setWishList(wishList.filter( (e) => (e.title !== movie)))
  }
  const myWishList = wishList.map( function (movie, i) {
    return <ListGroupItem className='p-1'>
          <Media>
            <Media left href="#" onClick={ () => deleteFromWl(movie.title) }>
              <Media object src={movie.image} alt={movie.title} style={{width:'60px', marginRight:'0.8em'}} />
            </Media>
            <Media body>
            {movie.title}
            </Media>
          </Media>
      </ListGroupItem>
  })



  // boucle film via API
  const [movieListApi, setMovieListApi] = useState([])
  useEffect(() => {
    async function loadData() {
      var rawResponse = await fetch('/new-movies')
      var response = await rawResponse.json()
      setMovieListApi(response)
    }
    loadData()
  }, [])

  // boucle de mes films
  const movieList = movieListApi.map(function(movie, i) {
    var result = wishList.find(element => element.title === movie.name)
    var isSee = false
    if (result !== undefined) {
      isSee = true
    }
    return <Movies key={i} movieSee={isSee} movieName={movie.title} movieDesc={movie.overview} movieImg={movie.backdrop_path} globalRating={movie.vote_average} globalCountRating={movie.vote_count} movieId={movie.id} handleClickAddMovieParent={handleClickAddMovie} handleClickDeleteMovieParent={handleClickDeleteMovie} />
  })
  var numberWish = wishList.length



  // render principale
  return (
    
   <div>
     <Container className="mb-4">
      <Navigation myWishList={myWishList} numberOfMovies={numberWish} />
     </Container>
    
    <Container>
      <Row>
      {movieList}
      </Row>
    </Container>
   </div>
  );
}

export default App;
