class MainApi {
  constructor(options) {
      this._urlBase = options.urlBase;
      this._headers = options.headers;

  }

  _checkError(res) {
      if (res.ok) {
          return res.json();
      }  else {
          Promise.reject(`Произошла ошибка: ${res.status}`);
      }
    }

  getInitialMovieList(token) {
      return fetch(`${this._urlBase}/movies`, {
              method: 'GET',
              headers: {
                "Authorization" : `Bearer ${token}`,
                'Content-Type': 'application/json'
                }
          })
          .then(this._checkError)
  }

  addNewMovies(data, token) {
      return fetch(`${this._urlBase}/movies`, {
              method: 'POST',
              headers: {
                "Authorization" : `Bearer ${token}`,
                'Content-Type': 'application/json'
                },
              body: JSON.stringify({
                country: data.country || 'country',
                director: data.director || 'director',
                duration: data.duration || 2020,
                year: data.year || 'year',
                description: data.description || 'description',
                image: data.image.url ? `https://api.nomoreparties.co${data.image.url}` : 'image',
                trailerLink: data.trailerLink || 'https://youtube.com',
                thumbnail: data.thumbnail ? `https://api.nomoreparties.co/${data.thumbnail}` : 'https://youtube.com',
                movieId: data.id,
                nameRU: data.nameRU || 'кино',
                nameEN: data.nameEN || 'movie',
              })
          })
          .then(this._checkError)
  }

  deleteMovies(cardId, token) {
      return fetch(`${ this._urlBase}/movies/${cardId}`, {
              method: 'DELETE',
              headers: {
                "Authorization" : `Bearer ${token}`,
                'Content-Type': 'application/json'
                }
          })
          .then(this._checkError)
  }
  
  registrationProfil(data) {
    return fetch(`${this._urlBase}/signup`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: data.name,
              email: data.email,
              password: data.password
            })
        })
        .then(this._checkError)
        .then((res) => res.data)
  }

  autorizationProfil(data) {
    return fetch(`${this._urlBase}/signin`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: data.email,
              password: data.password
            })
        })
        .then(this._checkError)
  }

  correctProfil(data, token) {
    console.log(data.name, data.email, token);
      return fetch(`${this._urlBase}/users/me`, {
              method: 'PATCH',
              headers: {
                'Authorization' : `Bearer ${token}`,
                'Content-Type': 'application/json'
                },
              body: JSON.stringify({
                  name: data.name,
                  email: data.email
              })
          })
          .then(this._checkError)
  }

  getUserProfil(token) {
    return fetch(`${this._urlBase}/users/me`, {
            method: 'GET',
            headers: {
              'Authorization' : `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
        })
        .then(this._checkError)
  }
}

const mainApi = new MainApi({
    urlBase: 'http://api.mymovies.nomoredomains.icu',
    headers: {
        'Content-Type': 'application/json'
    }
  });

  export default mainApi;