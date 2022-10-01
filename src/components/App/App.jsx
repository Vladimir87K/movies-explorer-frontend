import { useEffect, useState } from 'react';
import React from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Footer from '../Footer/Footer';
import Page404 from '../Page404/Page404';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';

const App = () => {
  const navigate = useNavigate();
    const [isOpenNavigation, setOpenNavigation] = useState(false);
    const [loggedIn, setLoggedIn] = useState(true);
    const [bacgroundHeader, setBackgroundHeader] = useState('##dddee3')

  const handleRegister = () => {
    navigate('/signup')
  }

  const handleLogin = () => {
    navigate('/signin')
  }

  const handleNavigation = () => {
    setOpenNavigation(true)
  }

  const closeNavigation = () => {
    setOpenNavigation(false)
  }
  const handleMain = () => {
    navigate('/');
    setBackgroundHeader('#dddee3')
    closeNavigation();
  }

  const handleMovies = () => {
    navigate('/movies')
    setBackgroundHeader('#fafafa')
    closeNavigation();
  }

  const handleSavedMovies = () => {
    navigate('/saved-movies');
    setBackgroundHeader('#fafafa')
    closeNavigation();
  }

  const handleProfile = () => {
    navigate('/profile');
    setBackgroundHeader('#fafafa')
    closeNavigation();
  }

  return (
    <div className='page'>
      <Header 
        handleLogin={handleLogin} 
        handleRegister={handleRegister} 
        handleNavigation={handleNavigation} 
        isOpen={isOpenNavigation} 
        isClose={closeNavigation} 
        loggedIn={loggedIn}
        handleMain={handleMain}
        handleMovies={handleMovies}
        handleSavedMovies={handleSavedMovies}
        handleProfile={handleProfile}
        bacgroundHeader={bacgroundHeader}
        />
        <div className='main'>
           <Routes>
            <Route path='/signin' element={<Login handleRegister={handleRegister} />} />
            <Route path='/signup' element={<Register handleLogin={handleLogin} />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/movies' element={<Movies />} />
            <Route path='/saved-movies' element={<SavedMovies />} />
            <Route path='/' element={<Main />} />
            <Route path='*' element={<Page404 />} />
          </Routes>
        </div>
      <Footer />
    </div>
  );
}

export default App;
