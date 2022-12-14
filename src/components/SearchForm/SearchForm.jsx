import React from 'react';
import { useState} from 'react'
import { useLocation } from 'react-router-dom';
import './SearchForm.css';
import lupa from '../../images/lupa.svg';

const SearchForm = (props) => {
  const location = useLocation()
  let item = (location.pathname === '/movies') ? 1 : 2;
  const [name, setName] = useState(
    (item === 1) 
    ? (localStorage.getItem('searchName') 
    ? localStorage.getItem('searchName') 
    : '') 
    : '');

  const handleChange = (e) => {
    setName(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit({name, item});
  }

  return (
    <div className='search'>
      <fieldset className='search-movie'>
        <form onSubmit={handleSubmit}  className='search-movie__form'>
          <img src={lupa} alt='лупа' className='search-movie__image' />
          <input onChange={handleChange} 
            id='search-movie__input' 
            type='text' 
            className='search-movie__input' 
            name='search-movie__input' 
            placeholder={`${(!props.defaultSearch && 'Ничего не найдено') || 'Фильмы'}`}  //
            value={name} 
            required
          />
          <span className='search-movie__error'></span>
          <button type='submit' className='search-movie__submit'>Найти</button>
        </form>
      </fieldset>
      <input onClick={() => props.handleSwitchtMovies(item)} type='checkbox' name='short-movie' id='short-movie' className='short-movie' checked={props.checkbox} />
      <label for='short-movie' className='short-movie_label' checked={props.checked}>Короткометражки</label>
    </div>
  )
}

export default SearchForm;