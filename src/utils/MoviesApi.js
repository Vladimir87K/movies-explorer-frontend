class MoviesApi {
  constructor(options) {
      this._urlBase = options.urlBase;
  }

  _checkError(res) {
      if (res.ok) {
          return res.json();
      }  else {
          Promise.reject(`Произошла ошибка: ${res.status}`);
      }
    }

  getDataMovies(token) {
      return fetch(this._urlBase, {
              method: 'GET',
          })
          .then(this._checkError)
  }
}

const moviesApi = new MoviesApi({
  urlBase: 'https://api.nomoreparties.co/beatfilm-movies'
});
  // fetch('https://api.nomoreparties.co/beatfilm-movies', {
  //   method: 'GET'
  // })
  // .then((res) => {
  //   if (res.ok) {
  //     return res.json();
  //   }  else {
  //     Promise.reject(`Произошла ошибка: ${res.status}`);
  //   }
  // })

export default moviesApi;