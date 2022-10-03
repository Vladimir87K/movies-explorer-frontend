import React from 'react';
import './Main.css';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Tech from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';

const Main = () => {
  return (
    <div className='main-page'>
      <Promo />
      <AboutProject />
      <Tech />
      <AboutMe />
      <Portfolio />
    </div>
  )
}

export default Main;