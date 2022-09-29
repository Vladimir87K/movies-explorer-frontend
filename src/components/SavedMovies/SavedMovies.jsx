import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const SavedMovies = () => {
  return (
    <div className=''>
      <SearchForm />
      <MoviesCardList />
    </div>
  )
}

export default SavedMovies;
