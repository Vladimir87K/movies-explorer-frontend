import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navigation.css';
import icon from '../../images/icon-close.svg'

const Navigation = (props) => {
  const navigate = useNavigate();

  const handleMain = () => {
    navigate('/')
  }

  const handleMovies = () => {
    navigate('/movies')
  }

  const handleSavedMovies = () => {
    navigate('/saved-movies')
  }

  const handleProfile = () => {
    navigate('/profile')
  }

  return (
    <div className={`navigation ${props.loggedIn && 'navigation_opened'}`}>
      <div className={`navigation-page ${props.isOpen && 'navigation-page_opened'}`}>
        <img onClick={props.isClose} src={icon} alt='крестик' className={`navigation__icon ${props.isOpen && 'navigation__icon_opened'}`}  />
        <nav className='navigation__content'>
          <p onClick={handleMain} className='navigation__link'>Главная</p>
          <p onClick={handleMovies} className='navigation__link'>Фильмы</p>
          <p onClick={handleSavedMovies} className='navigation__link'>Сохраненные фильмы</p>
        </nav>
        <p onClick={handleProfile} className='navigation__link-accaunt'>Аккаунт<img className='navigation__link-icon'></img></p>
      </div>

    </div>
  )
}

export default Navigation;
