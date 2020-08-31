import React, {useState, useEffect} from 'react'
import './App.css'
import { Movies } from './components/Movie'

import { Container, Row, ListGroupItem, Media } from 'reactstrap';
import { Nav, NavItem, NavLink } from 'reactstrap';
import {Button, UncontrolledPopover, PopoverHeader, PopoverBody, ListGroup} from 'reactstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

function App() {

  // wishlist
  const [wishList, setWishList] = useState([])
  const [movieListApi, setMovieListApi] = useState([])
  var numberWish = wishList.length
  
  useEffect(() => {
    async function loadMovies() {
      // get movie list from API
      var rawMovieList = await fetch('/new-movies')
      var movieList = await rawMovieList.json()
      setMovieListApi(movieList)
    } loadMovies()

    async function loadwishes() {
      // get wishlist from db
      var rawWLResponse = await fetch('/wishlist')
      var wlResponse = await rawWLResponse.json()
      setWishList(wlResponse)
    } loadwishes()
    
  }, [])


  // ajouer un film à la wish list
  var handleClickAddMovie = async (title, backdrop, movieId) => {
    await fetch('/wishlist/'+movieId, {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: 'movieId=' + movieId + '&title='+ title + '&image=' + backdrop
    })
    setWishList([...wishList, {title, backdrop, movieId}])
  }


  // supprimer un film de la bdd et de la wish list
  var handleClickDeleteMovie = async (movieId) => {
    await fetch('/wishlist/'+ movieId, {
      method: 'DELETE'
    })
    setWishList(wishList.filter( (e) => (e.movieId !== movieId)))
  }

  

  // boucle wishlist
  const myWishList = wishList.map( function (movie, i) {
    return <ListGroupItem className='p-1' key={i}>
          <Media>
            <Media left href="#" >
              <Media object src={movie.backdrop} alt={movie.title} style={{width:'60px', marginRight:'0.8em'}} />
            </Media>
            <Media body>
            {movie.title}
            </Media>
            <Media body style={{textAlign: 'right'}} >
            <FontAwesomeIcon icon={faTimesCircle} style={{cursor: 'pointer'}} onClick={ () => { handleClickDeleteMovie(movie.movieId) }} />
            </Media>
          </Media>
      </ListGroupItem>
  })


// boucle de mes films
const movieList = movieListApi.map(function(movie, i) {
  //verif si un film a le meme nom qu'un film dans la wishlist
  var isSee = false
  wishList.forEach(wish => {
    if (wish.movieId === movie.id) {
      isSee = true
    }
  })
  return <Movies key={i} movieSee={isSee} movieName={movie.title} movieDesc={movie.overview} movieImg={movie.backdrop_path} globalRating={movie.vote_average} globalCountRating={movie.vote_count} movieId={movie.id} handleClickAddMovieParent={handleClickAddMovie} handleClickDeleteMovieParent={handleClickDeleteMovie} />
})


  // render principale
  return (

   <div>
     <Container className="mb-4">
     <div className="navbar">
        <Nav>
          <NavItem>
          <NavLink href="#"><img src="../img/logo.png" width="42" height="36" alt="" loading="lazy" /></NavLink>
          </NavItem>
          <NavItem>
          <NavLink style={{color: 'white'}} href="#">Last release</NavLink>
          </NavItem>
        </Nav>

        <Button className="ml-auto" id="PopoverLegacy" type="button">{numberWish} films</Button>

        <UncontrolledPopover trigger="legacy" placement="bottom" target="PopoverLegacy">
        <PopoverHeader>Ma wishlist</PopoverHeader>
        <PopoverBody>
        <ListGroup className='list-group-flush'>
          {myWishList}
        </ListGroup>
        </PopoverBody>
      </UncontrolledPopover>
        </div>
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
