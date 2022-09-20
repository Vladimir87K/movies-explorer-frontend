import React from 'react';
import './Aboutme.css';
import link from '../../images/link.svg';
import portret from '../../images/portret.svg';

const Aboutme = () => {
  return (
    <div className='about'>
      <div className='title-page'>
        <h1 className='title-page__title'>Учебный проект студента факультета Веб-разработки.</h1>
        <div className='title-page__image'></div>
      </div>
      <div className='project'>
        <h2 className='project__title'>О проекте</h2>
        <div className='project__tab'>
          <div className='project__tab_column'>
            <h3 className='project__tab_title'>Дипломный проект включал 5 этапов</h3>
            <p className='project__tab_paragraph'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          </div>
          <div className='project__tab_column'>
            <h3 className='project__tab_title'>На выполнение диплома ушло 5 недель</h3>
            <p className='project__tab_paragraph'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </div>
        </div>
        <div className='project__diagram'>
          <h4 className='project__diagram_title'>1 неделя</h4>
          <h4 className='project__diagram_title'>4 недели</h4>
          <p className='project__diagram_subtitle'>Back-end</p>
          <p className='project__diagram_subtitle'>Front-end</p>
        </div>
      </div>
      <div className='technology'>
        <p className='technology__colontitul'>Технологии</p>
        <h2 className='technology__title'>7 технологий</h2>
        <p className='technology__subtitle'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <div className='technology__collection'>
          <p className='technology__type'>HTML</p>
          <p className='technology__type'>CSS</p>
          <p className='technology__type'>JS</p>
          <p className='technology__type'>React</p>
          <p className='technology__type'>Git</p>
          <p className='technology__type'>Express.js</p>
          <p className='technology__type'>MongoDB</p>
        </div>
      </div>
      <div className='student'>
        <p className='student__colontitul'>Студент</p>
        <div className='student__info'>
          <div className='student__info-container'>
            <h2 className='student__info-title'>Владимир</h2>
            <p className='student__info-subtitle'>Фронтенд-разработчик, 35 лет</p>
            <p className='student__info-history'>Я родился и живу в городе Йошкар-Ола. 
              По професси врач анестезиолог-реаниматолог, стаж работы более 10 лет. 
              Давно интересовался IT-технологиями, и обучение в Яндекс.Практикуме - мой первый серьезный 
              опыт по обучению в этой сфере
            </p>
            <a href='#' className='student__info-link'>GitHub</a>
          </div>
          <img className='student__info-img' src={portret} alt='изображение студента' />
        </div>
        <nav className='student__portfolio'>
          <h3 className='student__portfolio-title'>Портфолио</h3>
          <a href='#' className='student__portfolio_link'>
            <p className='student__link_name'>Статичный сайт</p>
            <img src={link} alt='ссылка' className='student__link_img' />
           </a>
          <a href='#' className='student__portfolio_link'>
            <p className='student__link_name'>Адаптивный сайт</p>
            <img src={link} alt='ссылка' className='student__link_img' />
           </a>
          <a href='#' className='student__portfolio_link'>
            <p className='student__link_name'>Одностраничное приложение</p>
            <img src={link} alt='ссылка' className='student__link_img' />
          </a>
        </nav>

      </div>
    </div>
  )
}

export default Aboutme;