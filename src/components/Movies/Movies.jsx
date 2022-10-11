import React from 'react';
import { useState } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ProtectedRoute from "../ProtectedRoute";

const Movies = (props) => {
  
  let search = false;
  if (props.searchMovies.length !== 0) {
    search = true;
  }

  

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
      <h2 className={`movies__message ${props.error && !search && 'movies__message_inaction'}`}>
        Необходимо выполнить поиск фильма по ключевому слову в названии. На данный момент фильмы не найдены.
      </h2>
      <MoviesCardList  dataMovies={props.dataMovies}
        searchMovies={props.searchMovies}
        handleRowMovies={props.handleRowMovies}
        handleMoviesList={props.handleMoviesList}
        checkbox={props.checkbox}
      />
    </div>
  )
}

export default Movies;