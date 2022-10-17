import React from 'react';
import { useEffect, useState } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import screensaver from '../../images/screensaver.svg';

const MoviesCardList = (props) => {
  const [viemMovies, setViemMovies] = useState(0);
  const [checkbox, setCheckbox] = useState(false);
  const btn = document.querySelector('.movieCardList__button');

  const viemBtn = () => {
    if (props.searchMovies.length <= viemMovies || countMoviesInRow() === Infinity) {
      btn.style.display = 'none';
    } else {
      btn.style.display = 'flex';
    }
  }

  const savedDataMoviesAndChecked = () => {
    if (!localStorage.getItem('savedViemMovies')) {
      localStorage.setItem('savedViemMovies', JSON.stringify(viemMovies));
      localStorage.setItem('savedChecked', checkbox);
    } else {
      localStorage.removeItem('savedViemMovies');
      localStorage.removeItem('savedChecked');
      localStorage.setItem('savedViemMovies', JSON.stringify(viemMovies));
      localStorage.setItem('savedChecked', checkbox);
    }
  }

  useEffect(() => {
    if (localStorage.getItem('savedViemMovies')) {
      setViemMovies(JSON.parse(localStorage('savedViemMovies')));
      setCheckbox(localStorage.getItem('savedChecked'));
    }
    
    window.addEventListener('unload', savedDataMoviesAndChecked)
    return () => {
      window.removeEventListener('unload', savedDataMoviesAndChecked)
    }
  }, [])

  useEffect(() => {
    let width = window.innerWidth;
    if (width > 868) {
      setViemMovies(15);
    } else if (width > 480) {
      setViemMovies(8)
    } else {
      setViemMovies(5)
    }
    if (props.searchMovies.length !== 0) {
      viemBtn()
    }
  }, [props.handleMoviesList]);

  const countMoviesInRow = () => {
    let widthBlock = document.querySelector('.cardList').clientWidth;     // поиск ширины блока
    let widthCard = document.querySelector('.card').clientWidth;          // поиск ширины карточки
    return Math.floor(widthBlock / widthCard);            // расчет количества карточек в ряд
  }

  const showAddMovies = () => {
    let row = countMoviesInRow();
    if (row === 3) {
      setViemMovies(viemMovies + 3);
    } else if (row < 3) {
      setViemMovies(viemMovies + 2);
    }
    viemBtn();
  }


  return (
    <div className={`movieCardList ${!props.handleMoviesList && 'movieCardList_inactive'}`}>
      <div className='cardList'>
        {props.searchMovies.slice(0, viemMovies).map((movie) => (
          <MoviesCard 
            key={movie.id}
            movieImg={movie.image.url}
            movieTitle={movie.nameRU} 
            movieTime={movie.duration}
            movieTrailer={movie.trailerLink}
            handleLikeMovie={props.handleLikeMovie}
            checkbox={props.checkbox}
            movie={movie}
            saveMovies={props.saveMovies}
            isLike={props.saveMovies.some((item) => item.movieId === movie.id ? true : false)}
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
