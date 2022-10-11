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
import ProtectedRoute from '../ProtectedRoute';

const App = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [password, setPassword] = useState('')
  const [isOpenNavigation, setOpenNavigation] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [bacgroundHeader, setBackgroundHeader] = useState('#dddee3');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);                  //факт ошибки
  const [textError, setTextError] = useState('');             //текст ошибки
  const [dataMovies, setDataMovies] = useState([]);           //массив полученных фильмов
  //const [saveMovies, setSaveMovies] = useState([]);           //массив сохраненных в профиле фильмов
  const [searchMovies, setSearchMovies] = useState([]);       //массив найденных фильмов
  const [viemMovies, setViemMovies] = useState([])
 // const [viemMovies, setViemMosies] = useState([]);
  const [defaultSearch, setDefaultSearch] = useState(false);  //если фильм не найден - вывести зпголовок
  // const [handleRowMovies, setHandleRowMovies] = useState([])
  const [handleMoviesList, setHandleMoviesList] = useState(false);
  const [checkbox, setCheckbox] = useState(false);
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

  const initialProfil = (token) => {
    mainApi.getUserProfil(token)
      .then((res) => {
        setCurrentUser(res.data);
      })
      .catch((err) => alert('загрузка профиля', err))
  }

  const registration = (data) => {
    setPassword(data.password);
    mainApi.registrationProfil(data)
      .then((res) => {
        setCurrentUser(data);
        autorization(data);
      })
      .catch((err) => alert('регистрация неудачна', err));
  }

  const autorization = (data) => {
    let parole = data.password ? data.password : password;
    mainApi.autorizationProfil({email: data.email, password: parole})
      .then((res) => {
        if (res.token) {
          setLoggedIn(true);
          setToken(res.token);
          localStorage.setItem('JWT', res.token);
          handleMovies();
          initialProfil(res.token);

          // mainApi.getInitialMovieList()
          //   .then((res) => {
          //     setSaveMovies([res]);
          //   })
          //   .catch((err) => {
          //     alert('заргузка сохраненных фильмов: ошибка', err);
          //   })
        } else {
          alert('Что-то пошло не так, попробуйте что-нибудь изменить');
        }
      })
      .catch((err) => alert('авторизацияЖ ошибка', err))
  }

  const correctProfil = (data) => {
    mainApi.correctProfil(data, token)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => alert('изменение профиля: ошибочка', err));
  }

  const countMoviesInRow = () => {
    let widthBlock = document.querySelector('.cardList').clientWidth;     // поиск ширины блока
    let widthCard = document.querySelector('.card').clientWidth;          // поиск ширины карточки
    return Math.floor(widthBlock / widthCard);            // расчет количества карточек в ряд
  }

  useEffect(() => {
    setLoading(true);
    moviesApi.then((data) => {
      console.log(data)
      setDataMovies(data);
      setLoading(false);
      setError(false);
    })
    .catch(err => {
      setLoading(false);
      setError(true);
      setTextError(err.message);
      alert('ошибка загрузки базы данных фильмов', err)
    })
  }, [])

  const handleRegister = () => {
    navigate('/signup')
  }

  const handleLogin = () => {
    navigate('/signin')
  }

  const handleNavigation = () => {
    setOpenNavigation(true);
    setLoading(false);
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
    let nameMovie = name.trim().toLowerCase();
    setSearchMovies([]);
    dataMovies.map((movie) => {
      let nameRU = movie.nameRU.toLowerCase();
      let nameEN = movie.nameEN.toLowerCase();
      // console.log(nameEN, nameRU)
      if (nameRU.includes(nameMovie) || nameEN.includes(nameMovie)) {
        setDefaultSearch(false);
        setSearchMovies((prev) => {
          return [movie, ...prev]
        });
        setHandleMoviesList(true);
        console.log(movie, 'Click!');
      } 
    })
  }

  // const rowMovies = (data) => {
  //   for (let i = 0; i < countMoviesInRow(); i++) {
  //     setHandleRowMovies((prev) => [data[i], ...prev])
  //   }
  // }

  const handleLikeMovie = () => {
    setCheckbox(true)
  }

  const hahdleOutAccount = () => {
    localStorage.clear('JWT');
    setLoggedIn(false);
    setBackgroundHeader('#dddee3')
    navigate('/');
  }

  const handleSwitchtMovies = () => {
    setCheckbox(!checkbox);
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
              
                <Route path='/profile' element={<ProtectedRoute loggedIn={loggedIn} >
                  <Profile 
                    hahdleOutAccount={hahdleOutAccount}
                    onSubmit={correctProfil}
                    />
                  </ProtectedRoute>
                } />
                <Route path='/movies' element={<ProtectedRoute loggedIn={loggedIn} >
                  <Movies 
                    loading={loading}
                    error={error}
                    searchMovies={searchMovies} 
                    dataMovies={dataMovies}
                    // saveMovies={saveMovies}
                    handleLikeMovie={handleLikeMovie} 
                    handleSearchMovie={handleSearchMovie}
                    defaultSearch={defaultSearch}
                    handleMoviesList={handleMoviesList}
                    handleSwitchtMovies={handleSwitchtMovies}
                    checkbox={checkbox}
                    viemMovies={viemMovies}
                  />
                  </ProtectedRoute>
                } />
                <Route path='/saved-movies' element={<ProtectedRoute loggedIn={loggedIn} >
                  <SavedMovies
                    // saveMovies={saveMovies}
                   />
                  </ProtectedRoute>
                } />
              
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
