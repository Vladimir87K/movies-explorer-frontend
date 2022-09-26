import React from 'react';
import './Login.css';
import logo from '../../images/logo.svg';

const Login = () => {
  return (
    <div className='popup'>
      <div className='popup__container'>
        <a href="#" className="popup__logo">
          <img src={logo} alt="логотип" className="popup__logo-image" />
        </a>
        <h1 className='popup__title'>Рады видеть!</h1>
        <fieldset className='popup__form-content'>
          <p className='popup__form-subtitle'>E-mail</p>
          <input className='popup__form-input popup__form-email' type='email' name='popup__form-email' id='popup__form-email' required />
          <span className='popup__form-error popup__form-email-error'>Что-то пошло не так</span>
          <p className='popup__form-subtitle'>Пароль</p>
          <input className='popup__form-input popup__form-password' type='password' name='popup__form-password' id='popup__form-password' required />
          <span className='popup__form-error popup__form-password-error'>Что-то пошло не так</span>
          <button className='popup__form-save' type='submit'>Войти</button>
          <p className='popup__paragraph'>Еще не зарегистрированы?<a className='popup__paragraph-link' href='#'>Регистрация</a></p>
        </fieldset>
      </div>
    </div>
  )
}

export default Login;