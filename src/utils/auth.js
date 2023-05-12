import { BASE_URL_AUTH } from "./constants";

class Auth {
  constructor(url) {
    this.url = url;
  }

  register(inputsValue) {
    return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inputsValue),
    })
  }

  authorization(inputsValue) {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inputsValue),
    })
  }

  getUserByToken(jwt) {
    return fetch(`${BASE_URL}/users/me`), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${jwt}`,
      }
    }
  }
}

const auth = new Auth(BASE_URL_AUTH);

export default auth;