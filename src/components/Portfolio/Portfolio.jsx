import React from "react";
import './Portfolio.css';
import link from '../../images/link.svg';

const Portfolio = () => {
  return (
    <section className='portfolio'>
      <h3 className='portfolio__title'>Портфолио</h3>
      <ul className='portfolio__list'>
        <li className='portfolio__list-item'>
          <a href='https://vladimir87k.github.io/how-to-learn/' target='blank' className='portfolio__link'>
            <p className='portfolio__link_name'>Статичный сайт</p>
            <img src={link} alt='ссылка' className='portfolio__link_img' />
          </a>
        </li>
        <li className='portfolio__list-item'>
          <a href='https://vladimir87k.github.io/russian-travel/' target='blank' className='portfolio__link'>
            <p className='portfolio__link_name'>Адаптивный сайт</p>
            <img src={link} alt='ссылка' className='portfolio__link_img' />
          </a>
        </li>
        <li className='portfolio__list-item'>
          <a href='https://vladimir87k.github.io/mesto-react/' target='blank' className='portfolio__link'>
            <p className='portfolio__link_name'>Одностраничное приложение</p>
            <img src={link} alt='ссылка' className='portfolio__link_img' />
          </a>
        </li>
      </ul>     
    </section>
  )
}
export default Portfolio;