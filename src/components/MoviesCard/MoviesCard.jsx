import React from "react";
import { useState } from 'react';
import './MoviesCard.css'
import screensaver from '../../images/screensaver.svg';

const MoviesCard = (props) => {
  const [isLike, setIsLike] = useState(false);
  const movieImage = props.movieImg ? ('https://api.nomoreparties.co/' + props.movieImg) : screensaver;
  let longMovie = false;

  if (props.movieTime < 40) {
    longMovie = true;
  }

  const handleTrailer = () => {
    window.open(props.movieTrailer, "_blank")
  }

  const likeMovie = () => {
    setIsLike(!isLike);
    props.handleLikeMovie();
  }

  return (
    <div className={`card ${!longMovie && props.checkbox && 'card_inaction'}`}>
      <img onClick={handleTrailer} className='card__image' src={movieImage} alt='постер фильма' />
        <div className='card__content'>
          <div className='card__info'>
            <h2 className='card__title'>{props.movieTitle}</h2>
            <p className='card__time'>{props.movieTime}</p>
          </div>
          <button onClick={() => {likeMovie(props.movie)}} className={`card__icon card__icon_inactive ${isLike && 'card__icon_active'}`} type='button'></button>
        </div>
    </div>
  )
}

export default MoviesCard;
