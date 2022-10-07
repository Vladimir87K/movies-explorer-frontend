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
      return fetch(`${this._urlBase}/cards`, {
              method: 'GET',
              headers: {
                "Authorization" : `Bearer ${token}`,
                'Content-Type': 'application/json'
                }
          })
          .then(this._checkError)
          .then((res) => res.data)
  }

  addNewMovies(data, token) {
    console.log(data, token, 'клик!')
      return fetch(`${this._urlBase}/cards`, {
              method: 'POST',
              headers: {
                "Authorization" : `Bearer ${token}`,
                'Content-Type': 'application/json'
                },
              body: JSON.stringify({
                  name: data.name,
                  link: data.link
              })
          })
          .then(this._checkError)
          .then((res) => res.data)
  }

  deleteMovies(cardId, token) {
      return fetch(`${ this._urlBase}/cards/${cardId}`, {
              method: 'DELETE',
              headers: {
                "Authorization" : `Bearer ${token}`,
                'Content-Type': 'application/json'
                }
          })
          .then(this._checkError)
          .then((res) => res.data)
  }
  
  getRegistrationProfil(data) {
    return fetch(`${this._urlBase}/users/me`, {
            method: 'GET',
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

  getAutorizationProfil(data) {
    return fetch(`${this._urlBase}/users/me`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: data.email,
              password: data.password
            })
        })
        .then(this._checkError)
        .then((res) => res.data)
  }

  correctUserInfo(data, token) {
    console.log(data, token);
      return fetch(`${this._urlBase}/users/me`, {
              method: 'PATCH',
              headers: {
                "Authorization" : `Bearer ${token}`,
                'Content-Type': 'application/json'
                },
              body: JSON.stringify({
                  name: data.name,
                  about: data.about
              })
          })
          .then(this._checkError)
          .then((res) => res.data)
  }
}

const mainApi = new MainApi({
    urlBase: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json'
    }
  });

  export default mainApi;