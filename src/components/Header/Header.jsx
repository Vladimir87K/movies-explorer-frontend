import React  from 'react';
//import { useNavigate } from "react-router-dom";
import './Header.css';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';

const Header = (props) => {
  
  return (
    <header className="header">
      <p onClick={props.handleMain} className='header__link'>
        <img src={logo} alt='логотип' className='header__logo' />
      </p>
        <nav className={`header__entrance ${!props.loggedIn && 'header__entrance_opened'}`}>
          <button onClick={props.handleRegister} className='header__entrance-btn'>Регистрация</button>
          <button onClick={props.handleLogin} className='header__entrance-btn'>Войти</button>
        </nav>
        <button onClick={props.handleNavigation} className={`header__burger ${!props.loggedIn && 'header__burger_close'}`}></button>
        <Navigation 
          isOpen={props.isOpen} 
          isClose={props.isClose} 
          loggedIn={props.loggedIn} 
          handleMain={props.handleMain}
          handleMovies={props.handleMovies}
          handleSavedMovies={props.handleSavedMovies}
          handleProfile={props.handleProfile}
          />
    </header>

  );
}

export default Header;