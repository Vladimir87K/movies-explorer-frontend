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
  const [saveMovies, setSaveMovies] = useState([]);           //массив сохраненных в профиле фильмов
  const [searchMovies, setSearchMovies] = useState([]);       //массив найденных фильмов после выполнения поиска
  const [saveViemMovies, setSaveViemMovies] = useState([])    //массив показываемых сохраненных фильмов
  // const [viemMovies, setViemMovies] = useState([])
  const [defaultSearch, setDefaultSearch] = useState(false);  //если фильм не найден - вывести зпголовок
  // const [handleRowMovies, setHandleRowMovies] = useState([])
  const [handleMoviesList, setHandleMoviesList] = useState(false);// переменная для показа/скрытия блока moviesCardList
  const [checkbox, setCheckbox] = useState(false);             // состояние чекбокса
  const [viemCountMovies, setViemCountMovies] = useState(0); // количество фильмов на экране при первоначальной загрузке
  const [viemAddCountMovies, setViemAddCountMovies] = useState(0);   // количество фильмов на экране после нажатия кнопки еще
  const [viemBtn, setViemBtn] = useState(true);

  useEffect(() => {
    let width = window.innerWidth;
    if (width >= 1280) {
      setViemCountMovies(16);
      setViemAddCountMovies(4);
    } else if (width > 1006) {
      setViemCountMovies(15);
      setViemAddCountMovies(3);
    } else if (width > 480) {
      setViemCountMovies(8);
      setViemAddCountMovies(2);
    } else {
      setViemCountMovies(5);
      setViemAddCountMovies(2);
    }
  }, [searchMovies])

  useEffect (() => {         
    console.log(searchMovies.length, viemCountMovies);                     // показывать кнопку еще или нет
    console.log()
    if (searchMovies.length >= viemCountMovies) { 
      setViemBtn(true);
    } else {
      setViemBtn(false);
    }
  }, [searchMovies, viemCountMovies])

  useEffect(() => {
    setSaveViemMovies(saveMovies);
    console.log(saveMovies);
  }, [saveMovies])

  const handleAddMovies = () => {
    setViemCountMovies(viemCountMovies + viemAddCountMovies);
  }

  const loadDataMovies = () => {                          // загрузка исходного массива фильмов
    setLoading(true);
    moviesApi.then((data) => {
      console.log(data)
      setLoading(false);
      setError(false);
      setDataMovies(data);
    })
    .catch(err => {
      setLoading(false);
      setError(true);
      setTextError(err.message);
      alert('ошибка загрузки базы данных фильмов', err)
    })
  }

  const loadDataSavedMovies = (token) => {                // загрузка фильмов с профиля
    mainApi.getInitialMovieList(token)
            .then((res) => {
              setSaveMovies(res);
            })
            .catch((err) => {
              alert('загрузка сохраненных фильмов: ошибка', err);
            })
  }

  const addNewMovie = (movie) => {                        // реакция на лайк - сохранение фильма в свой профиль
    mainApi.addNewMovies(movie, token)
        .then((res) => {
          setSaveMovies((prev) => [...prev, res]);
        })
        .catch((err) => {console.log(err)})
  }

  const deleteMovie = (id) => {                            // удаление фильма из сохраненной базы
    mainApi.deleteMovies(id, token)
      .then(() => {
        setSaveMovies(saveMovies.filter((item) => item._id !== id));
      })
      .catch((err) => {console.log(err)})
  }

  const handleLikeMovie = (e) => {                          // реакция на лайк, выбор удаления или сохранения
    if (!e.isLike) {
      addNewMovie(e.e)
    } else {
      e.e.id ? deleteMovie(saveMovies.filter((item) => item.movieId === e.e.id)[0]._id)
      : deleteMovie(saveMovies.filter((item) => item.movieId === e.e.movieId)[0]._id)
    }
  }

  const initialProfil = (token) => {                      // запрос данных профиля при входе
    mainApi.getUserProfil(token)
      .then((res) => {
        setCurrentUser(res.data);
      })
      .catch((err) => alert('загрузка профиля', err))
  }

  const registration = (data) => {                        // проведение регистрации
    setPassword(data.password);
    mainApi.registrationProfil(data)
      .then((res) => {
        setCurrentUser(data);
        autorization(data);
      })
      .catch((err) => alert('регистрация неудачна', err));
  }

  const autorization = (data) => {                         // авторизация автоматическая и самостоятельная
    let parole = data.password ? data.password : password;
    mainApi.autorizationProfil({email: data.email, password: parole})
      .then((res) => {
        if (res.token) {
          setLoggedIn(true);
          setToken(res.token);
          localStorage.setItem('JWT', res.token);
          handleMovies();
          initialProfil(res.token);
          loadDataMovies();
          loadDataSavedMovies(res.token);
        } else {
          alert('Что-то пошло не так, попробуйте что-нибудь изменить');
        }
      })
      .catch((err) => alert('авторизацияЖ ошибка', err))
  }

  const correctProfil = (data) => {                         // изменение данных профиля
    mainApi.correctProfil(data, token)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => alert('изменение профиля: ошибочка', err));
  }

  const handleRegister = () => { 
    navigate('/signup')
  }

  const handleLogin = () => {
    navigate('/signin')
  }

  const handleNavigation = () => {
    setOpenNavigation(true);
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

  const handleSearchMovie =  (data) => {
    console.log(data)
    let {name, item} = data;
    let nameMovie = name.trim().toLowerCase();
    if (item === 1) {
      setSearchMovies([]);
      dataMovies.map((movie) => {
        let nameRU = movie.nameRU.toLowerCase();
        let nameEN = movie.nameEN.toLowerCase();
        if (nameRU.includes(nameMovie) || nameEN.includes(nameMovie)) {
          setDefaultSearch(false);
          setSearchMovies((prev) => {
            return [movie, ...prev]
          });
          setHandleMoviesList(true);
        } 
      })
    } else if (item === 2) {
      if (name === '') {
        setSaveViemMovies(saveMovies);
      }
      setSaveViemMovies([]);
      saveMovies.map((movie) => {
        let nameRU = movie.nameRU.toLowerCase();
        let nameEN = movie.nameEN.toLowerCase();
        if (nameRU.includes(nameMovie) || nameEN.includes(nameMovie)) {
          setSaveViemMovies((prev) => {
            return [movie, ...prev]
          });
        } 
      })
    }  
  }

  const hahdleOutAccount = () => {
    localStorage.clear('JWT');
    localStorage.clear('searhName')
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
                    saveMovies={saveMovies}
                    handleLikeMovie={handleLikeMovie} 
                    handleSearchMovie={handleSearchMovie}
                    defaultSearch={defaultSearch}
                    handleMoviesList={handleMoviesList}
                    handleSwitchtMovies={handleSwitchtMovies}
                    checkbox={checkbox}
                    viemCountMovies={viemCountMovies}
                    showAddMovies={handleAddMovies}
                    viemBtn={viemBtn}
                  />
                  </ProtectedRoute>
                } />
                <Route path='/saved-movies' element={<ProtectedRoute loggedIn={loggedIn} >
                  <SavedMovies
                    saveViemMovies={saveViemMovies}
                    handleLikeMovie={handleLikeMovie}
                    handleSearchMovie={handleSearchMovie}
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
