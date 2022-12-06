import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = (props) => {
  const handleLike = (movie) => {
    if (props.saveMovies.length < 1 || props.saveMovies == null) {
      return false;
    }
    return props.saveMovies.some((item) => Number(item.movieId) === movie.id ? true : false);
  }
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
            saveMovies={props.saveMovies}
            isLike={props.saveMovies !== undefined ? handleLike(movie) : undefined}
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
