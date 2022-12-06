import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import './Profile.css';
import { reEmail, testName } from '../../utils/utils';

const Profile = (props) => {
  const userContext = useContext(CurrentUserContext);

  const [name, setName] = useState(userContext.name);
  const [email, setEmail] = useState(userContext.email);
  const [nameDirty, setNameDirty] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [validate, setValidate] = useState(false);

  useEffect(() => {
    setName(userContext.name);
    setEmail(userContext.email);
  }, [userContext]); 

  useEffect(() => {
    (nameError !== '' || emailError !== '')
    ? setValidate(false) 
    : (name === userContext.name && email === userContext.email)
    ? setValidate(false)
    : setValidate(true);
  }, [nameError, emailError, name, email]);

  const blurHandler = (e) => {
    if (e.target.type === 'text') {
      setNameDirty(true);
    } else if (e.target.type === 'email') {
      setEmailDirty(true);
    }
  }

  const handleChangeName = (e) => {
    blurHandler(e);
    let userName = e.target.value;
    setName(userName);
    if (userName === '') {
      setNameError('Имя не может быть пустым');
    } else if (userName.length < 2 && userName.length > 0) {
      setNameError('Имя не короче двух символов');
    } else if (!testName(userName)) {
      setNameError('Использованы недопустимые символы');
    } else if (userName === userContext.name) {
      setNameError('Имя не изменено');
    } else {
      setNameError('');
    }
  }

  const handleChangeEmail = (e) => {
    blurHandler(e);
    setEmail(e.target.value);
    if (e.target.value === '') {
      setEmailError('Email не может быть пустым')
    } else if (!reEmail.test(String(e.target.value).toLowerCase())) {
      setEmailError('Некорректный email');
    } else if (e.target.value === userContext.email) {
      setEmailError('Email не изменен')
    } else {
      setEmailError('')
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    props.onSubmit({
      name,
      email
    });
    setName(userContext.name);
    setEmail(userContext.email);
    setValidate(false);
  }

  return (
    <div className='profile'>
      <h1 className='profile__title'>{`Привет, ${userContext.name}!`}</h1>
      <fieldset className='profile__form'>
        <form onSubmit={onSubmit} className='profile__form'>
          <div className='profile__form-block-input'>
            <span className={`profile__form-error profile__form-name-error ${nameDirty && nameError && 'profil__form-error_action'}`}>
              {nameError || 1}
            </span>
            <p className='profile__form-subtitle'>Имя</p>
            <input  onBlur={blurHandler}
              onChange={handleChangeName} 
              className='profile__form-input profile__form-name' 
              type='text' 
              name='profile__form-name' 
              id='profile__form-name' 
              value={name} 
              placeholder='Введите имя' 
              required
            />
            <p className='profile__form-subtitle'>E-mail</p>
            <input  onBlur={blurHandler}
              onChange={handleChangeEmail} 
              className='profile__form-input profile__form-email' 
              type='email' 
              name='profile__form-email' 
              id='profile__form-email' 
              value={email} 
              placeholder='Введите Email' 
              required 
            />
            <span className={`profile__form-error profile__form-email-error ${emailDirty && emailError && 'propfil__form-error_action'}`}>
              {emailError || (emailError && 1)}
            </span>
          </div>
          <div className='profile__form-block-buttom'>
            <button className={`profile__button profile__form-save ${!validate && 'profile__form-save_disabled'}`} 
              type='submit' 
              disabled={!validate} >
              Редактировать
            </button>
            <button onClick={props.hahdleOutAccount} 
              className='profile__button profile__exit' 
              type='button'>
              Выйти из аккаунта
            </button>
          </div>
        </form>
      </fieldset>
    </div>
  )
}

export default Profile;
