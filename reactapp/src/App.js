import React, {useState} from 'react'
import './App.css'
import { Navigation } from './components/Nav'
import {Movies} from './components/Movie'

import { Container, Row, ListGroupItem, Media } from 'reactstrap';


function App() {
  const moviesData = [
    { name: 'Star Wars : L\'ascension de Skywalkers',
      desc: 'Lorizzle ipsum dolizzle away mofo, funky fresh adipiscing yippiyo. Uhuh ... yih! own yo\' velit, aliquet volutpizzle, suscipit quis, gravida vizzle, ma nizzle. Pellentesque eget tortizzle. Sed erizzle. Fusce that\'s the shizzle dolor its fo rizzle turpizzle tempizzle boofron. Mah nizzle go to hizzle nibh izzle turpis. Crazy izzle tortizzle.',
      img: '/img/starwars.jpg',
      note:6.7, vote:5 }, 
      { name: 'Maléfique : Le pouvoir du mal',
      desc: 'Pellentesque fo shizzle rhoncizzle nisi. In pimpin\' habitasse platea dictumst. Da bomb dapibizzle. Dizzle tellus bling bling, owned eu, mattizzle ac, eleifend vitae, nunc.',
      img: '/img/maleficent.jpg',
      note:8.2, vote:3 }, 
      { name: 'Jumanji: The next level',
      desc: 'Phasellizzle dang volutpizzle mammasay mammasa mamma oo sa. Ut break yo neck, yall bizzle lorem. Donec non est. Shut the shizzle up sapizzle daahng dawg, ultricizzle nizzle, accumsan nizzle, fermentizzle quis, mofo. ',
      img: '/img/jumanji.jpg',
      note:4, vote:5 }, 
      { name: 'Once uppon a time in hollywood',
      desc: 'Dizzle shut the shizzle up hizzle. Etizzle you son of a bizzle ornare ante. Sizzle dang. Vestibulum mammasay mammasa mamma oo sa pede boofron fo shizzle mah nizzle fo rizzle, mah home g-dizzle commodo commodo. Lorizzle ipsizzle dolizzle sizzle bizzle, consectetizzle fizzle elit. For sure ac yippiyo. Quisque mi sem, daahng dawg izzle, doggy a, eleifend a, elizzle.',
      img: '/img/once_upon.jpg',
      note:6, vote:7 }, 
      { name: 'Frozen',
      desc: 'Phasellizzle dang volutpizzle mammasay mammasa mamma oo sa. Ut break yo neck, yall bizzle lorem. Donec non est. Shut the shizzle up sapizzle daahng dawg, ultricizzle nizzle, accumsan nizzle, fermentizzle quis, mofo',
      img: '/img/frozen.jpg',
      note:4.6, vote:3 }, 
      { name: 'Bad Boy 3',
      desc: 'Pellentesque fo shizzle rhoncizzle nisi. In pimpin\' habitasse platea dictumst. Da bomb dapibizzle. Dizzle tellus bling bling, owned eu, mattizzle ac, eleifend vitae, nunc.',
      img: '/img/badboy3.jpg',
      note:4.1, vote:7 }, 
      { name: 'Terminator',
      desc: 'Funky fresh dang dizzle pimpin\' nisi aliquizzle mollis. Check it out potenti. Morbi crackalackin. Vivamus neque. Owned orci. Cras maurizzle maurizzle, interdizzle yo mamma, shut the shizzle up sizzle amizzle, malesuada izzle, pizzle. Pellentesque sizzle.',
      img: '/img/terminator.jpg',
      note:6.1, vote:1 }
  ]
  // Whishlist
  const [wishList, setWishList] = useState([])

  var handleClickAddMovie = (title, image) => {
    console.log(title, image)
      setWishList([...wishList, {title, image}])
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

  // boucle de mes films
  const movieList = moviesData.map(function(movie, i) {
    var result = wishList.find(element => element.title === movie.name)
    var isSee = false
    if (result !== undefined) {
      isSee = true
    }
    return <Movies key={i} movieSee={isSee} movieName={movie.name} movieDesc={movie.desc} movieImg={movie.img} globalRating={movie.note} globalCountRating={movie.vote} handleClickAddMovieParent={handleClickAddMovie} handleClickDeleteMovieParent={handleClickDeleteMovie} />
  })
  var numberWish = wishList.length

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
