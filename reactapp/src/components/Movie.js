import React, {useState} from 'react';
import {Card, CardImg, CardText, CardBody, Badge, Col} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faVideo, faStar } from '@fortawesome/free-solid-svg-icons'


const Movies = (props) => {

  // color of heart
  if(props.movieSee){
    var colorLike = {...genericStyle, color: '#e74c3c'}
  } else {
    var colorLike = {...genericStyle}
  }
  
  // Like btn -> Like & add to/delete from wishlist
  var clickLike = () => {
    if (props.movieSee === true) {
      props.handleClickDeleteMovieParent(props.movieId)
    } else {
      props.handleClickAddMovieParent(props.movieName, props.movieImg, props.movieId)
    }
  }

 

  // movie icon
  const [watch, setWatch ] = useState(0)
  var clickWatch = () => {
    setWatch(watch+1)
  }
  if (watch > 0) {
    movieCamera.color = 'gold'
  }

  // Rating stars
  const [rating, setRating] = useState(0)
  const [vote, setVote] = useState(props.globalCountRating)
  const [newScore, setNewSore] = useState(props.globalRating)

  var rateClick = (value) => {
    if (value === 'up') {
      if (rating < 10) {
        setRating(rating+1)
        setVote(props.globalCountRating+1)
        setNewSore(Math.round(((props.globalRating * props.globalCountRating) + rating) / vote))
        console.log(newScore)
      }
    } else if (value === 'down') {
      if (rating > 0) {
        setRating(rating-1)
        setVote(props.globalCountRating+1)
        setNewSore(Math.round(((props.globalRating * props.globalCountRating) + rating) / vote))
        console.log(newScore)
      }
    }
  }
  const rateTwo = (note) => {
    setRating(note)
    console.log(note)
    setVote(props.globalCountRating+1)
    setNewSore(Math.round(((props.globalRating * props.globalCountRating) + rating) / vote))
    console.log(newScore)
  }

  const rateStars = []
  for (let i=0; i<10; i++) {
    const num = i+1
    if (i>= rating) {
      rateStars.push(<FontAwesomeIcon key={i} icon={faStar} style={starIcon} data-key={num} onClick={ () => rateTwo(num) } />)
    } else {
      rateStars.push(<FontAwesomeIcon key={i} style={{color:'gold'}} icon={faStar} data-key={num}  onClick={ () => rateTwo(num) } />)
    }
  }

  const globalCount = []
  for (var i=0; i<10; i++) {
    if (i>= newScore) {
      globalCount.push(<FontAwesomeIcon key={i} icon={faStar} style={starIcon} />)
    } else {
      globalCount.push(<FontAwesomeIcon key={i} style={{color:'gold'}} icon={faStar} />)
    }
  }

  return (
    <Col xs="12" md="6" lg="4">
      <Card className="mb-3">
      <CardImg top width="100%" src={props.movieImg} alt="Card image cap" />
      <CardBody>
            <CardText className="font-weight-bold">{props.movieName}</CardText>
            <CardText className="mb-0">
              Like <FontAwesomeIcon icon={faHeart} style={colorLike} onClick={ () => clickLike() }/>
            </CardText>
            <CardText className="mb-0">
              Nombre de vues <FontAwesomeIcon icon={faVideo} style={movieCamera} onClick={ () => clickWatch() } />
              <Badge className="ml-2" color="secondary">{watch}</Badge>
            </CardText>
            <CardText className="mb-0">
              Mon avis {rateStars}
              <Badge className="ml-1" color="secondary" onClick={ () => rateClick('down')} >-1</Badge>
              <Badge className="ml-1" color="secondary" onClick={ () => rateClick('up')} >+1</Badge>
            </CardText>
            <CardText className="mb-0">
            Avis global {globalCount} ({vote})
            </CardText>
            <CardText>{props.movieDesc}</CardText>
      </CardBody>
    </Card>
  </Col>
  );
};



// styles
var genericStyle =  {
  cursor: 'pointer',
  transitionDuration: '.2s' 
}

var movieCamera = {
  ...genericStyle,
}

var starIcon = {
  ...genericStyle,
}



export {Movies};