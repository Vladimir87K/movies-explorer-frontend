import React from 'react';
import { useEffect } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import screensaver from '../../images/screensaver.svg';

const MoviesCardList = (props) => {
  const btn = document.querySelector('.movieCardList__button');

  // const countMoviesInRow = () => {
  //   let widthBlock = document.querySelector('.cardList').clientWidth;     // поиск ширины блока
  //   let widthCard = document.querySelector('.card').clientWidth;          // поиск ширины карточки
  //   return Math.floor(widthBlock / widthCard);            // расчет количества карточек в ряд
  // }

  // let moviesInRow = countMoviesInRow();

  useEffect(() => {
    let array = Array.from(document.querySelectorAll('.card'));
    let item = 0;

    if (showAddMovies.length !== 0) {array.forEach((e) => {    // включение - выключение кнопки "еще"
      if (!e.classList.contains('card_inaction')) {
        item++;
      }
      })
      if (item <= props.searchMovies.length) {
        btn.style.display = 'none';
      } else {
        btn.style.display = 'flex'
      }
    }
  }, [props.searchMovies, props.checkbox])

  

  const showAddMovies = () => {
    // if (x) {

    // }
  }

  return (
    <div className={`movieCardList ${!props.handleMoviesList && 'movieCardList_inactive'}`}>
      <div className='cardList'>
        {props.searchMovies.map((movie) => (
          <MoviesCard 
            key={movie.id}
            movieImg={movie.image.url}
            movieTitle={movie.nameRU} 
            movieTime={movie.duration}
            movieTrailer={movie.trailerLink}
            handleLikeMovie={props.handleLikeMovie}
            checkbox={props.checkbox}
          />
        ))}
      </div>
      <div className='movieCardList__button'>
        <button onClick={showAddMovies} className='movieCardList__btn' type='button'>Ещё</button>
      </div>
    </div>
  )
}

export default MoviesCardList;
