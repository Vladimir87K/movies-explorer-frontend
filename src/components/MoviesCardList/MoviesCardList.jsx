import React from 'react';
import { useEffect } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import screensaver from '../../images/screensaver.svg';

const MoviesCardList = (props) => {
  useEffect(() => {
    console.log(props.searchMovies)
  }, [props.searchMovies])
  
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
          />
        ))}
      </div>
      <div className='movieCardList__button'>
        <button className='movieCardList__btn' type='button'>Ещё</button>
      </div>
    </div>
  )
}

export default MoviesCardList;
