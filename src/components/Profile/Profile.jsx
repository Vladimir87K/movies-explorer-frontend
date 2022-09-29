import React from 'react';
import { useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleChangeName = (e) => {
    setName(e.target.value);
  }

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  return (
    <div className='profile'>
      <h1 className='profile__title'>Привет, Виталий!</h1>
      <fieldset className='profile__form'>
        <div className='profile__form-block-input'>
          <p className='profile__form-subtitle'>Имя</p>
          <input onChange={handleChangeName} className='profile__form-input profile__form-name' type='text' name='profile__form-name' id='profile__form-name' value={name} placeholder='Виталик' required />
          {/* <span className='profile__form-error profile__form-name-error'>Что-то пошло не так</span> */}
          <p className='profile__form-subtitle'>E-mail</p>
          <input onChange={handleChangeEmail} className='profile__form-input profile__form-email' type='email' name='profile__form-email' id='profile__form-email' value={email} placeholder='aaa@gmail.com' required />
          {/* <span className='profile__form-error profile__form-email-error'>Что-то пошло не так</span> */}
        </div>
        <div className='profile__form-block-buttom'>
          <button className='profile__button profile__form-save' type='submit'>Редактировать</button>
          <button className='profile__button profile__exit'>Выйти из аккаунта</button>
        </div>
      </fieldset>
    </div>
  )
}

export default Profile;
