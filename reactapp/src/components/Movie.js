import React, {useState, useEffect} from 'react';
import {Card, CardImg, CardText, CardBody, Badge, Col} from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faVideo, faStar } from '@fortawesome/free-solid-svg-icons'
import { set } from 'mongoose';


const Movies = (props) => {
  // styles
  var genericStyle =  {
    cursor: 'pointer',
    transitionDuration: '.5s' 
  }

  var heart = {
    ... genericStyle,
    color: '#grey'
  }

  var likedHeart = {
    ... genericStyle,
    color: '#e74c3c'
  }

  var movieCamera = {
    ... genericStyle,
  }

  var starIcon = {
    ... genericStyle,
  }

  // setter for heart color
  const [heartColor, setHeartColor] = useState('grey')

  // movieSee check if the movie is already in wishlist
  const [movieSee, setMovieSee] = useState(false)

  
  // Like btn -> Like & add to/delete from wishlist
  var clickLike = () => {
    if (movieSee === true) {
      props.handleClickDeleteMovieParent(props.movieId)
      setHeartColor('grey')
      setMovieSee(false)
    } else {
      props.handleClickAddMovieParent(props.movieName, props.movieImg, props.movieId)
      setHeartColor('#e74c3c')
      setMovieSee(true)
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
      rateStars.push(<FontAwesomeIcon icon={faStar} style={starIcon} data-key={num} onClick={ () => rateTwo(num) } />)
    } else {
      rateStars.push(<FontAwesomeIcon  style={{color:'gold'}} icon={faStar} data-key={num}  onClick={ () => rateTwo(num) } />)
    }
  }

  const globalCount = []
  for (var i=0; i<10; i++) {
    if (i>= newScore) {
      globalCount.push(<FontAwesomeIcon icon={faStar} style={starIcon} />)
    } else {
      globalCount.push(<FontAwesomeIcon  style={{color:'gold'}} icon={faStar} />)
    }
  }

  return (
    <Col xs="12" md="6" lg="4">
      <Card className="mb-3">
      <CardImg top width="100%" src={props.movieImg} alt="Card image cap" />
      <CardBody>
        <CardText>
            <p className="font-weight-bold">{props.movieName}</p>
            <p className="mb-0">
              Like <FontAwesomeIcon icon={faHeart} style={{... genericStyle,color:heartColor}} onClick={ () => clickLike() }/> {props.movieSee}
            </p>
            <p className="mb-0">
              Nombre de vues <FontAwesomeIcon icon={faVideo} style={movieCamera} onClick={ () => clickWatch() } />
              <Badge className="ml-2" color="secondary">{watch}</Badge>
            </p>
            <p className="mb-0">
              Mon avis {rateStars}
              <Badge className="ml-1" color="secondary" onClick={ () => rateClick('down')} >-1</Badge>
              <Badge className="ml-1" color="secondary" onClick={ () => rateClick('up')} >+1</Badge>
            </p>
            <p className="mb-0">
            Avis global {globalCount} ({vote})
            </p>
            <p>{props.movieDesc}</p>
        </CardText>
      </CardBody>
    </Card>
  </Col>
  );
};

export {Movies};