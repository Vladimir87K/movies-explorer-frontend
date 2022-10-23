import React from 'react';
import { useState, useEffect } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const Movies = (props) => {
  const [search, setSearch] = useState(false)

  useEffect(() => {
  if (props.searchMovies.length !== 0) {
    setSearch(true);
  } else {
    setSearch(false);
  }
  }, [props.searchMovies])
  
  if (props.loading) {
    return (
      <div className="movies">
        <Preloader />
      </div>
    )
  }

  return (
    <div className='movies'>
      <SearchForm 
        onSubmit={props.handleSearchMovie}
        defaultSearch={props.defaultSearch}
        handleSwitchtMovies={props.handleSwitchtMovies}
        checkbox={props.checkbox}
       />
      <h2 className={`movies__message ${!props.error && 'movies__message_inaction'}`}>
        Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. 
        Подождите немного и попробуйте ещё раз.
      </h2>
      <h2 className={`movies__message ${!props.error && search && 'movies__message_inaction'}`}>
        Необходимо выполнить поиск фильма по ключевому слову в названии. На данный момент фильмы не найдены.
      </h2>
      <MoviesCardList  dataMovies={props.dataMovies}
        saveMovies={props.saveMovies}
        searchMovies={props.searchMovies}
        handleMoviesList={props.handleMoviesList}
        handleLikeMovie={props.handleLikeMovie}
        checkbox={props.checkbox}
        viemCountMovies={props.viemCountMovies}
        showAddMovies={props.showAddMovies}
        viemBtn={props.viemBtn}
      />
    </div>
  )
}

export default Movies;