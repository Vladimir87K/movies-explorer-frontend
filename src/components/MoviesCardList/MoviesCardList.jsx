import React from 'react';
import { useEffect, useState } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = (props) => {

  return (
    <div className={`movieCardList ${!props.handleMoviesList && 'movieCardList_inactive'}`}>
      <div className='cardList'>
        {props.searchMovies.slice(0, props.viemCountMovies).map((movie) => (
          (<MoviesCard 
            key={movie.id ? movie.id : movie.movieId}
            movieImg={movie.image.url ? movie.image.url : movie.image}
            movieTitle={movie.nameRU} 
            movieTime={movie.duration}
            movieTrailer={movie.trailerLink}
            handleLikeMovie={props.handleLikeMovie}
            checkbox={props.checkbox}
            movie={movie}
            isDelete={props.isDelete}
            isLike={props.saveMovies !== undefined ? (props.saveMovies.some((item) => item.movieId === movie.id ? true : false)) : undefined}
          />)
        ))}
      </div>
      <div className={`movieCardList__button ${props.viemBtn && 'movieCardList__button_action'}`} >
        <button onClick={props.showAddMovies} className='movieCardList__btn' type='button'>Ещё</button>
      </div>
    </div>
  )
}

export default MoviesCardList;
