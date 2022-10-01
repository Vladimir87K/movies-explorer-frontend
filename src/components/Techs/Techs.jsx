import React from "react";
import './Tech.css';

const Tech = () => {
  return (
    <section className='technology'>
      <p className='technology__colontitul'>Технологии</p>
      <h2 className='technology__title'>7 технологий</h2>
      <p className='technology__subtitle'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <ul className='technology__collection'>
        <li className='technology__type'>HTML</li>
        <li className='technology__type'>CSS</li>
        <li className='technology__type'>JS</li>
        <li className='technology__type'>React</li>
        <li className='technology__type'>Git</li>
        <li className='technology__type'>Express.js</li>
        <li className='technology__type'>MongoDB</li>
      </ul>
    </section>
  )
}

export default Tech;