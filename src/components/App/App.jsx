import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate,useLocation, Routes, Route } from 'react-router-dom';
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
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState({});
  const [password, setPassword] = useState('')
  const [isOpenNavigation, setOpenNavigation] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [bacgroundHeader, setBackgroundHeader] = useState('#dddee3');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);                  //факт ошибки
  const [dataMovies, setDataMovies] = useState([]);           //массив полученных фильмов
  const [saveMovies, setSaveMovies] = useState([]);           //массив сохраненных в профиле фильмов
  const [searchMovies, setSearchMovies] = useState([]);       //массив найденных фильмов после выполнения поиска
  const [swithMovies, setSwitchtMovies] = useState([]);       //короткометражки фильмов после поиска
  const [saveViemMovies, setSaveViemMovies] = useState([])    //массив показываемых сохраненных фильмов
  const [switchSaveMovies, setSwitchSaveMovies] = useState([]);       //короткометражки сохраненных фильмов
  const [handleMoviesList, setHandleMoviesList] = useState(false);// переменная для показа/скрытия блока moviesCardList
  const [checkbox, setCheckbox] = useState(false);             // состояние чекбокса
  const [checkboxSaveMovies, setCheckboxSaveMovies] = useState(false); // состояние чекбокса сохраненных фильмов
  const [viemCountMovies, setViemCountMovies] = useState(0); // количество фильмов на экране при первоначальной загрузке
  const [viemAddCountMovies, setViemAddCountMovies] = useState(0);   // количество фильмов на экране после нажатия кнопки еще
  const [viemBtn, setViemBtn] = useState(true);
  const [search, setSearch] = useState(false);

    useEffect (() => {
    const jwt = localStorage.getItem('JWT');
    if (jwt) {
      setLoggedIn(true);
      setToken(jwt);
      setCurrentUser(JSON.parse(localStorage.getItem('currentUser')));
      setDataMovies(JSON.parse(localStorage.getItem('dataMovies')));
      setCheckbox(localStorage.getItem('checkbox'));
      setError(false);
      if (localStorage.getItem('searchName')) {
        setSearchMovies(JSON.parse(localStorage.getItem('searchMovies')));
        setSwitchtMovies(JSON.parse(localStorage.getItem('swithMovies')));
        setHandleMoviesList(true);
      } else {
        setHandleMoviesList(false);
      }
      if (localStorage.getItem('saveMovies') !== 'undefined') {
        setSaveMovies(JSON.parse(localStorage.getItem('saveMovies')));
        setSwitchSaveMovies(JSON.parse(localStorage.getItem('switchSaveMovies')));
      }
      if (location.pathname !== '/') {
        setBackgroundHeader('#fafafa');
      }
      if (location.pathname === '/signin' || location.pathname === '/signup') {
        navigate('/');
        setBackgroundHeader('#dddee3');
      }
    }
  }, [])

  useEffect(() => {                                     // расчет количества показываемых карточек и количества добавляемых
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
      setViemAddCountMovies(5);
    }
  }, [searchMovies])

  useEffect (() => {                                     // показывать кнопку еще или нет
    let viemMovie = !checkbox ? searchMovies : switchSaveMovies;
    if (viemMovie !== null) {
      if (viemMovie.length > viemCountMovies) { 
        setViemBtn(true);
      } else {
        setViemBtn(false);
      }
      if (searchMovies.length !== 0) {
        localStorage.setItem('swithMovies', JSON.stringify(swithMovies));
        localStorage.setItem('searchMovies', JSON.stringify(searchMovies));
      }
    } 
  }, [searchMovies, viemCountMovies, checkbox])

  useEffect(() => {                                     // обновление показываемых сохраненных фильмов при лайке или удалении со страницы
    setSaveViemMovies(!checkboxSaveMovies ? saveMovies : switchSaveMovies);
  }, [saveMovies, checkboxSaveMovies])

  const handleAddMovies = () => {
    setViemCountMovies(viemCountMovies + viemAddCountMovies);
  }

  const addLocalStorage = (name, data) => {
    localStorage.setItem(name, JSON.stringify(data))
  }

  const loadDataMovies = () => {                          // загрузка исходного массива фильмов
    moviesApi.getDataMovies()
    .then((data) => {
      setLoading(false);
      setError(false);
      setDataMovies(data);
      addLocalStorage('dataMovies', data)
    })
    .catch(err => {
      setError(true);
      alert('ошибка загрузки базы данных фильмов', err)
    })
  }

  const loadDataSavedMovies = (token) => {                // загрузка фильмов с профиля
    mainApi.getInitialMovieList(token)
      .then((res) => {
        setSaveMovies(res);
        let switchMovies = res.filter((movie) => movie.duration <= 40);
        setSwitchSaveMovies(switchMovies);
        if (res !== undefined) {
          addLocalStorage('saveMovies', res);
          addLocalStorage('switchSaveMovies', switchMovies);
        }
      })
      .catch((err) => {
        alert('загрузка обращения к базе данных сохраненных фильмов', err);
      })
  }

  const addNewMovie = (movie) => {                        // реакция на лайк - сохранение фильма в свой профиль
    let movies = [];
    let switchMovies = [];
    mainApi.addNewMovies(movie, token)
        .then((res) => {
          movies = [...saveMovies, res]
          setSaveMovies(movies)
          addLocalStorage('saveMovies', movies);
          if (res.duration <= 40) {
            switchMovies = [...switchSaveMovies, res];
            setSwitchSaveMovies(switchMovies);
            addLocalStorage('switchSaveMovies', switchMovies);
          }
        })
        .catch((err) => {
          console.log(err)
          if (err.status === 401) {
            alert('Ошибка авторизации, войдите в свой аккаунт заново.')
            hahdleOutAccount();
          } else {
            alert('Неуточненная ошибка');
          }
      })
  }

  const deleteMovie = (id) => {                            // удаление фильма из сохраненной базы
    let movies = [];
    let switchMovies = [];
    mainApi.deleteMovies(id, token)
      .then(() => {
        movies = saveMovies.filter((item) => item._id !== id);
        switchMovies = switchSaveMovies.filter((item) => item._id !== id)
        setSaveMovies(movies);
        setSwitchSaveMovies(switchMovies);
        addLocalStorage('saveMovies', movies);
        addLocalStorage('switchSaveMovies', switchMovies);
      })
      .catch((err) => {
        console.log(err)
        if (err.status === 401) {
          alert('Ошибка авторизации, войдите в свой аккаунт заново.');
          hahdleOutAccount();
        } else {
          alert('Неуточненная ошибка.');
        }
      })
  }

  const handleLikeMovie = (e) => {         // реакция на лайк, выбор удаления или сохранения
    if (!e.isLike) {
      addNewMovie(e.e)
    } else {
      e.e.id ? deleteMovie(saveMovies.filter((item) => Number(item.movieId) === e.e.id)[0]._id)
      : deleteMovie(saveMovies.filter((item) => Number(item.movieId) === Number(e.e.movieId))[0]._id)
    }
  }

  const initialProfil = (token) => {                      // запрос данных профиля при входе
    mainApi.getUserProfil(token)
      .then((res) => {
        setCurrentUser(res.data);
        addLocalStorage('currentUser', res.data);
      })
      .catch((err) => alert('Ошибка загрузки профиля', err))
  }

  const registration = (data) => {                        // проведение регистрации
    setPassword(data.password);
    mainApi.registrationProfil(data)
      .then((res) => {
          setCurrentUser(data);
          autorization(data);
      })
      .catch((err) => {
        if (err.status === 409) {
          alert('Указанный Email уже сохранен.');
        } else {
          alert('регистрация неудачна', err);
        }
      });
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
      .catch((err) => alert('Неправильная почта или пароль'));
  }

  const correctProfil = (data) => {                         // изменение данных профиля
    mainApi.correctProfil(data, token)
      .then((res) => {
        setCurrentUser(res);
        alert('Данные профиля успешно изменены')
      })
      .catch((err) => {
        console.log(err)
          if (err.status === 401) {
            alert('Ошибка авторизации, войдите в свой аккаунт заново.');
            hahdleOutAccount();
          } else {
            alert('Извините, произошла непредвиденная ошибка.');
          }
      });
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

  const handleLoading = () => {           // выведение лоадера и скрытие карточек
    setLoading(true);   
    setHandleMoviesList(false);
    setTimeout(() => {
      setLoading(false);
      setHandleMoviesList(true);
    }, 1000);
  }

  useEffect(() => {                       // отслеживание изменения массива поиска
    if (searchMovies.length !== 0) {
      setSearch(true);
      handleLoading();
    } else {
      setSearch(false);
    }
  }, [searchMovies] )
  

  const handleSearchMovie = (data) => {           // проведение поиска фильма по названию 
    let {name, item} = data;
    let nameMovie = name.trim().toLowerCase();
    if (item === 1) {

      setSearchMovies([]);
      setSwitchtMovies([])
      dataMovies.map((movie) => {
        let nameRU = movie.nameRU.toLowerCase();
        let nameEN = movie.nameEN.toLowerCase();
        if (nameRU.includes(nameMovie) || nameEN.includes(nameMovie)) {
          setSearchMovies((prev) => {
            return [movie, ...prev]
          });
          if (movie.duration <= 40) {
            setSwitchtMovies((prev) => [...prev, movie])
          }
        } 
      })
      localStorage.setItem('searchName', name);
    } else if (item === 2) {
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
    localStorage.clear();
    localStorage.removeItem('swithMovies');
    localStorage.removeItem('searchMovies');
    setCurrentUser({});
    setLoggedIn(false);
    setError(false);
    setBackgroundHeader('#dddee3');
    setDataMovies([]);
    setSaveMovies([]);
    setSearchMovies([]);
    setSwitchtMovies([]);
    setSaveViemMovies([]);
    setSwitchSaveMovies([]);
    setHandleMoviesList(false);
    setCheckbox(false);
    setCheckboxSaveMovies(false);
    setViemCountMovies(0);
    setViemAddCountMovies(0);
    navigate('/');
  }

  const handleSwitchtMovies = (item) => {
    if (item === 1) {
      setCheckbox(!checkbox);
      localStorage.setItem('checkbox', !checkbox ? checkbox : '');
    } else if (item === 2) {
      setCheckboxSaveMovies(!checkboxSaveMovies)
    }
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
                    searchMovies={!checkbox ? searchMovies : swithMovies}
                    saveMovies={saveMovies}
                    handleLikeMovie={handleLikeMovie} 
                    handleSearchMovie={handleSearchMovie}
                    handleMoviesList={handleMoviesList}
                    handleSwitchtMovies={handleSwitchtMovies}
                    checkbox={checkbox}
                    viemCountMovies={viemCountMovies}
                    showAddMovies={handleAddMovies}
                    viemBtn={viemBtn}
                    search={search}
                  />
                  </ProtectedRoute>
                } />
                <Route path='/saved-movies' element={<ProtectedRoute loggedIn={loggedIn} >
                  <SavedMovies
                    checkbox={checkboxSaveMovies}
                    saveViemMovies={!checkboxSaveMovies ? saveViemMovies : switchSaveMovies}
                    handleLikeMovie={handleLikeMovie}
                    handleSearchMovie={handleSearchMovie}
                    handleSwitchtMovies={handleSwitchtMovies}
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
