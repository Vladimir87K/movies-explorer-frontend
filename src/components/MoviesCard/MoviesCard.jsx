import React from "react";
import './MoviesCard.css'
import screensaver from '../../images/screensaver.svg';

const MoviesCard = () => {
  return (
    <div className="card">
      <img className='card__image' src={screensaver} alt='постер фильма' />
        <div className='card__content'>
          <div className='card__info'>
            <h2 className='card__title'>33 слова о дизайне</h2>
            <p className='card__time'>1ч33мин</p>
          </div>
          <button className='card__icon card__icon_inactive'></button>
        </div>
    </div>
  )
}

export default MoviesCard;
