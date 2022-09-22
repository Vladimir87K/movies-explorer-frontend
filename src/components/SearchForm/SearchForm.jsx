import React from 'react';
import './SearchForm.css';
import lupa from '../../images/lupa.svg';

const SearchForm = () => {
  return (
    <div className='search'>
      <fieldset className='search-movie'>
        <img src={lupa} alt='лупа' className='search-movie__image' />
        <input id='search-movie__input' type='text' className='search-movie__input' name='search-movie__input' placeholder='Фильмы' />
        <span className='search-movie__error'></span>
        <button type='submit' className='search-movie__submit'>Найти</button>
      </fieldset>
      <input type='checkbox' name='short-movie' id='short-movie' className='short-movie' />
      <label for='short-movie' className='short-movie_label'>Короткометражки</label>
    </div>
  )
}

export default SearchForm;