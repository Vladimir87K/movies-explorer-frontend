import React from 'react';
import './Register.css';
import logo from '../../images/logo.svg';

const Register = () => {
  return (
    <div className='popup'>
      <div className='popup__container'>
        <a href="#" className="popup__logo">
          <img src={logo} alt="логотип" className="popup__logo-image" />
        </a>
        <h1 className='popup__title'>Добро пожаловать!</h1>
        <fieldset className='popup__form-content'>
          <p className='popup__form-subtitle'>Имя</p>
          <input className='popup__form-name' type='text' name='popup__form-name' id='popup__form-name' />
          <span className='popup__form-error popup__form-name-error'></span>
          <p className=''>E-mail</p>
          <input className='popup__form-email' type='email' name='popup__form-email' id='popup__form-email' />
          <span className='popup__form-error popup__form-email-error'></span>
          <p className=''>Пароль</p>
          <input className='popup__form-password' type='password' name='popup__form-password' id='popup__form-password' />
          <span className='popup__form-error popup__form-password'></span>
          <button className='popup__form-save' type='submit'>Зарегистрироваться</button>
          <p className=''>Уже зарегестрированны?<a className='' href='#'>Войти</a></p>
        </fieldset>
      </div>
    </div>
  )
}

export default Register;
