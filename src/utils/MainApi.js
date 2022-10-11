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
    console.log(data)
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
    console.log(data.email, token);
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
    urlBase: 'http://localhost:3001',
    headers: {
        'Content-Type': 'application/json'
    }
  });

  export default mainApi;