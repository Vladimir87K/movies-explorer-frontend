import React from 'react';
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <h2 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className='footer__container'>
        <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
        <nav className='footer__navigate'>
          <a href='https://practicum.yandex.ru/' className='footer__link'>Яндекс.Практикум</a>
          <a href='https://pages.github.com/?(null)' className='footer__link'>GitHub</a>
        </nav>
      </div>
    </footer>
  )
}

export default Footer;