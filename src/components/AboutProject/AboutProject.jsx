import React from 'react';
import './AboutProject.css';

const AboutProject = () => {
  return (
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
  )
}

export default AboutProject;