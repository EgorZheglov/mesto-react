class Api {
    constructor({baseUrl, headers}) {
      this._registrationURL = 'https://auth.nomoreparties.co' //Пока что тут такой хардкод, насколько я понимаю.
      this._url = baseUrl;
      this._headers = headers;
    }

    _checkResponse(res) {
      //проверка ответа на запрос
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(res.status)
      }


    getUserData(){
      //Получаем информацию пользователе с сервера.
        return fetch(`${this._url}/users/me`,{
          headers: this._headers
        })
        .then(this._checkResponse)
    }


    getInitialCards(){
      //получаем карточки, загруженные на сервер
      return fetch(`${this._url}/cards`,{
        headers: this._headers
      })
      .then(this._checkResponse)
    }


    toggleLike(id, method){
      //Сообщаем серверу, что лайк поставлен
      return fetch(`${this._url}/cards/likes/${id}`, {
        method: `${method}`,
        headers: this._headers,
      })
      .then(this._checkResponse)
    }


    sendCardInfo(name, link){
      //ОТправляем данные карточки
      return fetch(`${this._url}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: `${name}`,
          link: `${link}`
        })
      })
      .then(this._checkResponse) 
    }

    deleteCard(id){
      //Сообщаем серверу, что лайк поставлен
      return fetch(`${this._url}/cards/${id}`, {
        method: `DELETE`,
        headers: this._headers,
      })
      .then(this._checkResponse)
    }

    sendUserData(name, about){
      //Отправляем измененные данные на сервер.
      return fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: `${name}`,
          about: `${about}`
        })
      })
      .then(this._checkResponse)
    }

    sendUserAvatar(link){
      //Отправляем измененные данные на сервер.
      return fetch(`${this._url}/users/me/avatar`, {
        method:`PATCH`,
        headers: this._headers,
        body: JSON.stringify({
          avatar: `${link}`,
        })
      })
      .then(this._checkResponse)
    }
  }



  class SignApi{
    constructor(baseUrl){
      this._url = baseUrl;
    }

    _checkResponse(res) {
      //проверка ответа на запрос
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(res)
      }

    signUp(email, password){
       //Регистрируем пользователя пользователя

      return fetch(`${this._url}/signup`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          password: `${password}`,
          email: `${email}`
        })
      })
      .then(this._checkResponse)
     }

    signIn(email, password){
      //Авторизируем пользователя

     return fetch(`${this._url}/signin`, {
       method: 'POST',
       headers: {'Content-Type': 'application/json'},
       body: JSON.stringify({
         password: `${password}`,
         email: `${email}`
       })
     })
     .then(this._checkResponse)
    }

    tokenCheck(token){
     return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(this._checkResponse)
    } 
  }


  const signApi = new SignApi('https://auth.nomoreparties.co');


  const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-25',
    headers: {
      authorization: '2245779c-6198-47bc-8dae-135ddf28bc0e',
      'Content-Type': 'application/json'
    }
  });

  export {api, signApi};