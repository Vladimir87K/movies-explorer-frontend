import React  from 'react';
//import { useNavigate } from "react-router-dom";
import './Header.css';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';
import { useNavigate } from 'react-router-dom';

const Header = (props) => {
  const navigate = useNavigate();

  const handleMain = () => {
    navigate('/');
  }
  
  return (
    <header className="header">
      <p onClick={handleMain} className='header__link'>
        <img src={logo} alt='логотип' className='header__logo' />
      </p>
        <nav className={`header__entrance ${!props.loggedIn && 'header__entrance_opened'}`}>
          <button onClick={props.handleRegister} className='header__entrance-btn'>Регистрация</button>
          <button onClick={props.handleLogin} className='header__entrance-btn'>Войти</button>
        </nav>
        <button onClick={props.handleNavigation} className={`header__burger ${!props.loggedIn && 'header__burger_close'}`}></button>
        <Navigation isOpen={props.isOpen} isClose={props.isClose} loggedIn={props.loggedIn} />
    </header>

  );
}

export default Header;