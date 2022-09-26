import React from 'react';
import './Navigation.css';
import icon from '../../images/icon-close.svg'

const Navigation = () => {
  return (
    <div className='navigation'>
      <div className='navigation-page'>
        <img src={icon} alt='крестик' className='navigation__icon'  />
        <nav className='navigation__content'>
          <a href='#' className='navigation__link'>Главная</a>
          <a href='#' className='navigation__link'>Фильмы</a>
          <a href='#' className='navigation__link'>Сохраненные фильмы</a>
        </nav>
        <a className='navigation__link-accaunt' href='#'>Аккаунт<p className='navigation__link-icon'></p></a>
      </div>

    </div>
  )
}

export default Navigation;
