import React from 'react';
import { useState } from 'react';
import './Login.css';
import logo from '../../images/logo.svg';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  }
  
  return (
    <div className='popup'>
      <div className='popup__container'>
        <a href="/" className="popup__logo">
          <img src={logo} alt="логотип" className="popup__logo-image" />
        </a>
        <h1 className='popup__title'>Рады видеть!</h1>
        <fieldset className='popup__form-content'>
          <p className='popup__form-subtitle'>E-mail</p>
          <input onChange={handleChangeEmail} className='popup__form-input popup__form-email' type='email' name='popup__form-email' id='popup__form-email' value={email} required />
          <span className='popup__form-error popup__form-email-error'>Что-то пошло не так</span>
          <p className='popup__form-subtitle'>Пароль</p>
          <input onChange={handleChangePassword} className='popup__form-input popup__form-password' type='password' name='popup__form-password' id='popup__form-password' value={password} required />
          <span className='popup__form-error popup__form-password-error'>Что-то пошло не так</span>
          <div className='popup__submit'>
            <button className='popup__form-save' type='submit'>Войти</button>
            <p className='popup__paragraph'>Еще не зарегистрированы?<span className='popup__paragraph-link' onClick={props.handleRegister}>Регистрация</span></p>
          </div>
        </fieldset>
      </div>
    </div>
  )
}

export default Login;