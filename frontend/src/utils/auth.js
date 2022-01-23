class Auth {

  constructor({ url, headers}) {
    this.url = url;
    this.headers = headers;
  }

  _handleResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  };

  register = ({ password, email }) => {
    return fetch(`${this.url}/signup`, {
      method: 'POST',
      headers: this.headers,
      credentials: "include",
      body: JSON.stringify({password, email})
    })
    .then(this._handleResponse)
  }

  authorize = ({ password, email }) => {
    return fetch(`${this.url}/signin`, {
      method: 'POST',
      headers: this.headers,
      credentials: "include",
      body: JSON.stringify({password, email})
    })
    .then(this._handleResponse)
  }
}

const auth = new Auth({
  url: 'https://api.starikov.nomoredomains.work',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default auth;

