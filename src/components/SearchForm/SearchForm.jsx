import React from 'react';
import { useState } from 'react'
import './SearchForm.css';
import lupa from '../../images/lupa.svg';

const SearchForm = (props) => {
  const [name, setName] = useState('');

  const handleChange = (e) => {
    setName(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(name);
    setName('');
  }
  return (
    <div className='search'>
      <fieldset className='search-movie'>
        <form onSubmit={handleSubmit}  className='search-movie__form'>
          <img src={lupa} alt='лупа' className='search-movie__image' />
          <input onChange={handleChange} id='search-movie__input' type='text' className='search-movie__input' name='search-movie__input' placeholder={`${(props.defaultSearch && 'Фильмы не найдены') || 'Фильмы'}`} value={name} required />
          <span className='search-movie__error'></span>
          <button type='submit' className='search-movie__submit'>Найти</button>
        </form>
      </fieldset>
      <input type='checkbox' name='short-movie' id='short-movie' className='short-movie' />
      <label for='short-movie' className='short-movie_label'>Короткометражки</label>
    </div>
  )
}

export default SearchForm;