import React from "react";
import './AboutMe.css';
import portret from '../../images/portret.jpg';

const AboutMe= () => {
  return (
    <section className="about">
      <p className='about__colontitul'>Студент</p>
      <div className='about__info'>
        <div className='about__info-container'>
          <h2 className='about__info-title'>Владимир</h2>
          <p className='about__info-subtitle'>Фронтенд-разработчик, 35 лет</p>
          <p className='about__info-history'>Я родился и живу в городе Йошкар-Ола. 
            По професси врач анестезиолог-реаниматолог, стаж работы более 10 лет. 
            Давно интересовался IT-технологиями, и обучение в Яндекс.Практикуме - мой первый серьезный 
            опыт по обучению в этой сфере
          </p>
          <a href='https://github.com/Vladimir87K' target='blank' className='about__info-link'>GitHub</a>
        </div>
        <img className='about__info-img' src={portret} alt='изображение студента' />
      </div>
    </section>
  )
}

export default AboutMe;