import React from 'react';
import { useLocation } from 'react-router-dom';
import './Navigation.css';
import icon from '../../images/icon-close.svg'

const Navigation = (props) => {
  const location = useLocation()
  let page = 0;
  if (location.pathname === '/movies') {
    page = 2
  } else if (location.pathname === '/saved-movies') {
    page = 3;
  } else if (location.pathname === '/') {
    page = 1;
  }

  return (
    <div  className={`navigation ${(props.loggedIn && 'navigation_opened')} ${props.isOpen && 'navigation_opened-burger'}` }>
      <div style={{backgroundColor: props.bacgroundHeader}} className={`navigation-page ${props.loggedIn && 'navigation-page_opened'} ${props.isOpen && 'navigation-page_opened-burger'}`}>
        <img onClick={props.isClose} src={icon} alt='крестик' className={`navigation__icon ${props.isOpen && 'navigation__icon_opened'}`}  />
        <nav className='navigation__content'>
          <p onClick={props.handleMain} className={`navigation__link ${page === 1 ? 'navigation__link_action' : false}`}>Главная</p>
          <p onClick={props.handleMovies} className={`navigation__link ${page === 2 ? 'navigation__link_action' : false}`}>Фильмы</p>
          <p onClick={props.handleSavedMovies} className={`navigation__link ${page === 3 ? 'navigation__link_action' : false}`}>Сохраненные фильмы</p>
        </nav>
        <p onClick={props.handleProfile} className='navigation__link-accaunt'>Аккаунт<span className='navigation__link-icon'></span></p>
      </div>
    </div>
  )
}

export default Navigation;
