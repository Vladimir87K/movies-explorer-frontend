import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const SavedMovies = (props) => {
  return (
    <div className='savedMovies'>
      <SearchForm 
        onSubmit={props.handleSearchSavedMovie}         //
        defaultSearch={props.defaultSearch}
        handleSwitchtMovies={props.handleSwitchtMovies}
        checkbox={props.checkboxSavedMovies}            //
      />
      <MoviesCardList 
        dataMovies={props.savedMovies}
      />
    </div>
  )
}

export default SavedMovies;
