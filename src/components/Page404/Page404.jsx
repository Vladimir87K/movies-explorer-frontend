import React from 'react';
import './Page404.css';

const Page404 = () => {

  const onClick = (e) => {
    e.preventDefault();
    window.history.back();
  }

  return (
    <div className='page404'>
      <h1 className='page404__title'>404</h1>
      <p className='page404__subtitle'>Страница не найдена</p>
      <p onClick={onClick} className='page404__link'>Назад</p>
    </div>
  )
}

export default Page404;
