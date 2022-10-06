const moviesApi = 
  fetch('https://api.nomoreparties.co/beatfilm-movies', {
    method: 'GET'
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }  else {
      Promise.reject(`Произошла ошибка: ${res.status}`);
    }
  })

export default moviesApi;