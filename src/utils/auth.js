import { BASE_URL_AUTH } from "./constants";

class Auth {
  constructor(url) {
    this.url = url;
  }

  _checkResopne(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  register(inputsValue) {
    return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inputsValue),
    }).then((res) => this._checkResopne(res));
  }

  authorization(inputsValue) {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inputsValue),
    }).then((res) => this._checkResopne(res));
  }

  getUserByToken(jwt) {
    return fetch(`${BASE_URL}/users/me`), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${jwt}`,
      }
    }.then((res) => this._checkResopne(res));
  }
}

const auth = new Auth(BASE_URL_AUTH);

export default auth;