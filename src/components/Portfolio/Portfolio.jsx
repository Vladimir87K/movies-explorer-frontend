import React from "react";
import './Portfolio.css';
import link from '../../images/link.svg';

const Portfolio = () => {
  return (
    <nav className='portfolio'>
      <h3 className='portfolio__title'>Портфолио</h3>
      <a href='#' className='portfolio__link'>
        <p className='portfolio__link_name'>Статичный сайт</p>
        <img src={link} alt='ссылка' className='portfolio__link_img' />
       </a>
      <a href='#' className='portfolio__link'>
        <p className='portfolio__link_name'>Адаптивный сайт</p>
        <img src={link} alt='ссылка' className='portfolio__link_img' />
       </a>
      <a href='#' className='portfolio__link'>
        <p className='portfolio__link_name'>Одностраничное приложение</p>
        <img src={link} alt='ссылка' className='portfolio__link_img' />
      </a>
    </nav>
  )
}
export default Portfolio;