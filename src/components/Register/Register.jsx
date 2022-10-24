import React from 'react';
import { useState } from 'react';
import './Register.css';
import logo from '../../images/logo.svg';


const Register = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameDirty, setNameDirty] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [nameError, setNameError] = useState('Имя не может быть пустым');
  const [emailError, setEmailError] = useState('Email не может быть пустым');
  const [passwordError, setPasswordError] = useState('Пароль не может быть пустым');
  const [validate, setValidate] = useState(false)

  const validateBtn = () => {
    if (name !== '' && email !== '' && password !== '') {
      return true;
    } else {
      return false;
    }
  }

  const handleChangeName = (e) => {
    setName(e.target.value);
    setValidate(validateBtn());
  }

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    setValidate(validateBtn());
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    setValidate(validateBtn());
  }

  const onSubmit = (e) => {
    e.preventDefault();
    props.onSubmit({
      name,
      email,
      password
    });
    setEmail('');
    setName('');
    setPassword('');
  }

  return (
    <div className='popup'>
      <div className='popup__container'>
        <a href="/" className="popup__logo">
          <img src={logo} alt="логотип" className="popup__logo-image" />
        </a>
        <h1 className='popup__title'>Добро пожаловать!</h1>
        <fieldset  className='popup__form-content'>
          <form onSubmit={onSubmit} className='popup__form'>
            <p className='popup__form-subtitle'>Имя</p>
            <input onChange={handleChangeName} className='popup__form-input popup__form-name' type='text' name='popup__form-name' id='popup__form-name' value={name} required />
            <span className='popup__form-error popup__form-name-error'>Что-то пошло не так</span>
            <p className='popup__form-subtitle'>E-mail</p>
            <input onChange={handleChangeEmail} className='popup__form-input popup__form-email' type='email' name='popup__form-email' id='popup__form-email' value={email} required />
            <span className='popup__form-error popup__form-email-error'>Что-то пошло не так</span>
            <p className='popup__form-subtitle'>Пароль</p>
            <input onChange={handleChangePassword} className='popup__form-input popup__form-password' type='password' name='popup__form-password' id='popup__form-password' value={password} required />
            <span className='popup__form-error popup__form-password-error'>Что-то пошло не так</span>
            <div className='popup__submit'>
              <button className={`popup__form-save ${!validate && 'popup__form-save_disabled'}`} type='submit' disabled={!validate} >Зарегистрироваться</button>
              <p className='popup__paragraph'>Уже зарегестрированны?<span className='popup__paragraph-link' onClick={props.handleLogin} >Войти</span></p>
            </div>
          </form>
        </fieldset>
      </div>
    </div>
  )
}

export default Register;
