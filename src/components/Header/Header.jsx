import React  from 'react';
//import { useNavigate } from "react-router-dom";
import './Header.css';
import logo from '../../images/logo.svg';
import landing from '../../images/icon-accaunt.svg';

const Header = (props) => {

  return (
    <header className="header">
      <a href="#" className="header__link">
        <img src={logo} alt="логотип" className="header__logo" />
      </a>
        <nav className='header__entrance'>
          <button className='header__entrance_btn'>Регистрация</button>
          <button className='header__entrance_btn'>Войти</button>
        </nav>
        <nav className='header__navigate'>
          <a className='header__navigate_link' href='#'>Фильмы</a>
          <a className='header__navigate_link' href='#'>Сохраненные фильмы</a>
          <a className='header__navigate_link' href='#'>Аккаунт<p className='header__link_icon'></p></a>
        </nav>
        <button className='header__burger'></button>
    </header>

  );
}

export default Header;