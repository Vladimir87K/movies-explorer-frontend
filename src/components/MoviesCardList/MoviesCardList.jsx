import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import screensaver from '../../images/screensaver.svg';

const MoviesCardList = () => {
  return (
    <div className='movieCardList'>
      <div className='cardList'>
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <div className='card'>
          <img className='card__image' src={screensaver} alt='постер фильма' />
          <div className='card__content'>
            <div className='card__info'>
              <h2 className='card__title'>33 слова о дизайне</h2>
              <p className='card__time'>1ч33мин</p>
            </div>
            <button className='card__icon card__icon_inactive' type='button'></button>
          </div>
        </div>
        <div className='card'>
          <img className='card__image' src={screensaver} alt='постер фильма' />
          <div className='card__content'>
            <div className='card__info'>
              <h2 className='card__title'>33 слова о дизайне</h2>
              <p className='card__time'>1ч33мин</p>
            </div>
            <button className='card__icon card__icon_active' type='button'></button>
          </div>
        </div>
        <div className='card'>
          <img className='card__image' src={screensaver} alt='постер фильма' />
          <div className='card__content'>
            <div className='card__info'>
              <h2 className='card__title'>33 слова о дизайне</h2>
              <p className='card__time'>1ч33мин</p>
            </div>
            <button className='card__icon card__icon_delete' type='button'></button>
          </div>
        </div>
      </div>
      <div className='movieCardList__button'>
        <button className='movieCardList__btn' type='button'>Ещё</button>
      </div>
    </div>
  )
}

export default MoviesCardList;
