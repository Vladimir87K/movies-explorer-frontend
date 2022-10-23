import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const SavedMovies = (props) => {
  return (
    <div className='savedMovies'>
      <SearchForm 
        onSubmit={props.handleSearchMovie}         //
        defaultSearch={props.defaultSearch}
        handleSwitchtMovies={props.handleSwitchtMovies}
        checkbox={props.checkboxSavedMovies}            //
      />
      <MoviesCardList 
        handleMoviesList={true}
        searchMovies={props.saveViemMovies}
        viemCountMovies={props.saveViemMovies.length}
        isDelete={true}
        handleLikeMovie={props.handleLikeMovie}
        viemBtn={false}
      />
    </div>
  )
}

export default SavedMovies;
