import React from "react";
import { useState } from 'react';
import './MoviesCard.css'
import screensaver from '../../images/screensaver.svg';

const MoviesCard = (props) => {
  const [isLike, setIsLike] = useState(props.isLike);
  const movieImage = props.movieImg 
    ? (props.movieImg.includes('https://api.nomoreparties.co/') 
    ? props.movieImg 
    : ('https://api.nomoreparties.co/' + props.movieImg)) 
    : screensaver;

  const handleTrailer = () => {
    window.open(props.movieTrailer, "_blank")
  }

  const likeMovie = (e) => {
    if (isLike === undefined) {
      props.handleLikeMovie({e, isLike: true});
    } else {
      props.handleLikeMovie({e, isLike: isLike});
      setIsLike(!isLike);
    }
  }

  const timeMovie = (time) => {
    if (time < 60) {
      return `${time}минут`;
    } else if (time - 60 < 60) {
      return `1ч${time - 60}м`
    } else if (time - 120 < 60) {
      return `2ч${time - 120}м`
    } else {
      return `${time}м`
    }
  }
  
  return (
    <div className={`card`}>
      <img onClick={handleTrailer} className='card__image' src={movieImage} alt='постер фильма' />
        <div className='card__content'>
          <div className='card__info'>
            <h2 className='card__title'>{props.movieTitle}</h2>
            <p className='card__time'>{timeMovie(props.movieTime)}</p>
          </div>
          <button onClick={() => {likeMovie(props.movie)}}
            className={`card__icon ${isLike && 'card__icon_active'} ${props.isDelete && 'card__icon_delete'}`} 
            type='button'>
          </button>
        </div>
    </div>
  )
}

export default MoviesCard;
