import React from "react";
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const Movies = (props) => {
  return (
    <div className="movies">
      <SearchForm 
        onSubmit={props.handleSearchMovie}
        defaultSearch={props.defaultSearch}
       />
      {/* <Preloader /> */}
        <MoviesCardList  dataMovies={props.dataMovies}
          searchMovies={props.searchMovies}
          handleRowMovies={props.handleRowMovies}
          handleMoviesList={props.handleMoviesList}
        />
    </div>
  )
}

export default Movies;