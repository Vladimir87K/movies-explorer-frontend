import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import './Profile.css';

const Profile = (props) => {
  const userContext = useContext(CurrentUserContext);

  const [name, setName] = useState(userContext.name);
  const [email, setEmail] = useState(userContext.email);
  const [validate, setValidate] = useState(false);

  useEffect(() => {
    setName(userContext.name);
    setEmail(userContext.email);
    console.log('Что имеем:', userContext);
  }, [userContext]); 

  const validateBtn = () => {
    if (email !== '' && name !== '') {
      return true;
    } else {
      return false;
    }
  }

  const handleChangeName = (e) => {
    setName(e.target.value);
    setValidate(validateBtn())
  }

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    setValidate(validateBtn())
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
    console.log('коррекция в пути!!1', name, email);
  }

  return (
    <div className='profile'>
      <h1 className='profile__title'>{`Привет, ${userContext.name}!`}</h1>
      <fieldset className='profile__form'>
        <form onSubmit={onSubmit} className='profile__form'>
          <div className='profile__form-block-input'>
            <p className='profile__form-subtitle'>Имя</p>
            <input onChange={handleChangeName} className='profile__form-input profile__form-name' type='text' name='profile__form-name' id='profile__form-name' value={name} placeholder='Введите имя' required />
            {/* <span className='profile__form-error profile__form-name-error'>Что-то пошло не так</span> */}
            <p className='profile__form-subtitle'>E-mail</p>
            <input onChange={handleChangeEmail} className='profile__form-input profile__form-email' type='email' name='profile__form-email' id='profile__form-email' value={email} placeholder='Введите Email' required />
            {/* <span className='profile__form-error profile__form-email-error'>Что-то пошло не так</span> */}
          </div>
          <div className='profile__form-block-buttom'>
            <button className={`profile__button profile__form-save ${!validate && 'profile__form-save_disabled'}`} type='submit' disabled={!validate} >Редактировать</button>
            <button onClick={props.hahdleOutAccount} className='profile__button profile__exit' type='button'>Выйти из аккаунта</button>
          </div>
        </form>
      </fieldset>
    </div>
  )
}

export default Profile;
