/* eslint-disable no-useless-escape */
import React from 'react';
import { useState, useEffect } from 'react';
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
  const [validate, setValidate] = useState(false);

  useEffect(()=> {
    (nameError || emailError || passwordError) ? setValidate(false) : setValidate(true)
  }, [nameError, emailError, passwordError])

  const blurHandler = (e) => {
    if (e.target.type === 'text') {
      setNameDirty(true);
    } else if (e.target.type === 'email') {
      setEmailDirty(true);
    } else if (e.target.type === 'password') {
      setPasswordDirty(true);
    }
  }

  const handleChangeName = (e) => {
    setName(e.target.value);
    const re = /[^a-z+а-я+\s+ё+\-+]/gi;
    (e.target.value === '') ? setNameError('Имя не может быть пустым')
    : (e.target.value.length < 3) ? setNameError('Имя не короче двух символов')
    : (re.test(String(e.target.value))) ? setNameError('Использованы недопустимые символы')
    : setNameError('')
  }

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    (e.target.value === '') ? setEmailError('Email не может быть пустым')
    : (!re.test(String(e.target.value).toLowerCase())) ? setEmailError('Некорректный email') 
    : setEmailError('')
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    (e.target.value.length === '') ? setPasswordError('Пароль не может быть пустым')
    : (e.target.value.length < 6) ? setPasswordError('Пароль должен иметь не менее 6 символов') 
    : setPasswordError('')
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
            <input onBlur={blurHandler} onChange={handleChangeName} className={`popup__form-input popup__form-name ${nameDirty && nameError && 'popup__form-input_invalid'}`} type='text' name='popup__form-name' id='popup__form-name' min={2} value={name} required />
            <span className={`popup__form-error popup__form-name-error ${nameDirty && nameError && 'popup__form-error_action'}`}>{nameError}</span>
            <p className='popup__form-subtitle'>E-mail</p>
            <input onBlur={blurHandler} onChange={handleChangeEmail} className={`popup__form-input popup__form-email ${emailDirty && emailError && 'popup__form-input_invalid'}`} type='email' name='popup__form-email' id='popup__form-email' value={email} required />
            <span className={`popup__form-error popup__form-email-error ${emailDirty && emailError && 'popup__form-error_action'}`}>{emailError}</span>
            <p className='popup__form-subtitle'>Пароль</p>
            <input onBlur={blurHandler} onChange={handleChangePassword} className={`popup__form-input popup__form-password ${passwordDirty && passwordError && 'popup__form-input_invalid'}`} type='password' name='popup__form-password' id='popup__form-password' value={password} min={6} required />
            <span className={`popup__form-error popup__form-password-error ${passwordDirty && passwordError && 'popup__form-error_action'}`}>{passwordError}</span>
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
