import React from "react";
import './Tech.css';

const Tech = () => {
  return (
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
  )
}

export default Tech;