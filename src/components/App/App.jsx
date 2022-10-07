import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { CurrentUserContext } from '../../context/CurrentUserContext';
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
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';

const App = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [password, setPassword] = useState('')
  const [isOpenNavigation, setOpenNavigation] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);
  const [bacgroundHeader, setBackgroundHeader] = useState('##dddee3');
  const [token, setToken] = useState('');
  const [dataMovies, setDataMovies] = useState([]);           //массив полученных фильмов
  const [searchMovies, setSearchMovies] = useState([]);       //массив найденных фильмов
  const [defaultSearch, setDefaultSearch] = useState(false);  //если фильм не найден - вывести зпголовок
  // const [handleRowMovies, setHandleRowMovies] = useState([])
  const [handleMoviesList, setHandleMoviesList] = useState(false);
  // const [isLike, setIsLike] = useState(false);


//   useEffect(() => {
//     const jwt = localStorage.getItem("JWT");
//     if (jwt) {
//         auth.getControl(jwt)
//             .then((res) => {
//                 setEmail(res.data.email);
//                 setUser(true);
//                 setLoggedIn(true);
//                 setCurrentUser(res.data);
//                 setToken(jwt);
//                 navigate("/main");
//             }).catch((err) => console.log(err))
//     } else {
//         navigate("/sign-up");
//     }
// }, [loggedIn]);

//   useEffect(() => {
//     if (token) { 
//       mainApi.getInitialProfil(token).then((data) => {
//        setCurrentUser(data);
//        })
//        .catch((err) => console.log(err));

//       mainApi.getInitialMovieList(token).then((data) => {
//        setCards(data);
//        })
//        .catch(err => console.log(err));
//     }
// }, [token]);

  const registration = (data) => {
    setPassword(data.password);
    mainApi.getRegistrationProfil(data)
      .then((res) => {
        console.log('ответ пришел', res)
        autorization(data);
      })
      .catch((err) => console.log(err));
  }

  const autorization = (data) => {
    let parole = data.password ? data.password : password;
    console.log(parole);
    mainApi.getAutorizationProfil({email: data.email, password: parole})
      .then((res) => {
        if (res.token) {
          setLoggedIn(true);
          localStorage.setItem('JWT', res.token);
          navigate('/movies');
        } else {
          alert('Что-то пошло не так, попробуйте что-нибудь изменить');
        }
      })
      .catch((err) => alert(err))
  }

  const countMoviesInRow = () => {
    let widthBlock = document.querySelector('.cardList').clientWidth;     // поиск ширины блока
    let widthCard = document.querySelector('.card').clientWidth;          // поиск ширины карточки
    return Math.floor(widthBlock / widthCard);            // расчет количества карточек в ряд
  }

  useEffect(() => {
    moviesApi.then((data) => {
      setDataMovies([data])
    })
    .catch(err => alert(err))
  }, [loggedIn])

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
    setOpenNavigation(false);
  }
  const handleMain = () => {
    navigate('/');
    setBackgroundHeader('#dddee3');
    closeNavigation();
  }

  const handleMovies = () => {
    navigate('/movies')
    setBackgroundHeader('#fafafa');
    closeNavigation();
  }

  const handleSavedMovies = () => {
    navigate('/saved-movies');
    setBackgroundHeader('#fafafa');
    closeNavigation();
  }

  const handleProfile = () => {
    navigate('/profile');
    closeNavigation();
    setBackgroundHeader('#fafafa');
  }

  const handleSearchMovie = (name) => {
    console.log('Click1')
    let nameMovie = name.trim().toLowerCase();
    // console.log(nameMovie);
    setSearchMovies([]);
    dataMovies.map((movies) => {
      movies.map((movie) => {
        let nameRU = movie.nameRU.toLowerCase();
        let nameEN = movie.nameEN.toLowerCase();
        console.log(nameEN, nameRU)
        if (nameRU.includes(nameMovie) || nameEN.includes(nameMovie)) {
          setHandleMoviesList(true)
          setDefaultSearch(false)
          // eslint-disable-next-line no-unused-expressions
          setSearchMovies[(prev) => [movie, ...prev]];
          console.log(movie, 'click!')
        } 
      })
    })
  }

  // const rowMovies = (data) => {
  //   for (let i = 0; i < countMoviesInRow(); i++) {
  //     setHandleRowMovies((prev) => [data[i], ...prev])
  //   }
  // }

  const handleLikeMovie = () => {
    
  }

  return (
    <div className='page'>
      <CurrentUserContext.Provider value={currentUser} >
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
          <main className='main'>
            <Routes>
              <Route path='/signin' element={<Login 
                handleRegister={handleRegister} 
                onSubmit={autorization}
                />} />
              <Route path='/signup' element={<Register 
                handleLogin={handleLogin} 
                onSubmit={registration}
                />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/movies' element={<Movies 
                searchMovies={searchMovies} 
                handleLikeMovie={handleLikeMovie} 
                handleSearchMovie={handleSearchMovie}
                defaultSearch={defaultSearch}
                handleMoviesList={handleMoviesList}
                />} />
              <Route path='/saved-movies' element={<SavedMovies />} />
              <Route path='/' element={<Main />} />
              <Route path='*' element={<Page404 />} />
            </Routes>
          </main>
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
