import React from 'react';
import './Navigation.css';
import icon from '../../images/icon-close.svg'

const Navigation = (props) => {
  return (
    <div className={`navigation ${(props.isOpen && 'navigation_opened')}`}>
      <div className={`navigation-page ${props.isOpen && 'navigation-page_opened'}`}>
        <img onClick={props.isClose} src={icon} alt='крестик' className={`navigation__icon ${props.isOpen && 'navigation__icon_opened'}`}  />
        <nav className='navigation__content'>
          <p onClick={props.handleMain} className='navigation__link'>Главная</p>
          <p onClick={props.handleMovies} className='navigation__link'>Фильмы</p>
          <p onClick={props.handleSavedMovies} className='navigation__link'>Сохраненные фильмы</p>
        </nav>
        <p onClick={props.handleProfile} className='navigation__link-accaunt'>Аккаунт<span className='navigation__link-icon'></span></p>
      </div>

    </div>
  )
}

export default Navigation;
