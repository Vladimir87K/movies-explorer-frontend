import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const SavedMovies = (props) => {
  return (
    <div className='savedMovies'>
      <SearchForm />
      <MoviesCardList 
        savedMovies={props.savedMovies}
      />
    </div>
  )
}

export default SavedMovies;
