class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return res.json().then(err => {
      let errorMessage = `Error: ${res.status}`;
      if (err.message) {
        errorMessage += ` - ${err.message}`;
      } else if (err.error) {
        errorMessage += ` - ${err.error}`;
      }
      return Promise.reject(errorMessage);
    });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    }).then(this._checkResponse);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    }).then(this._checkResponse);
  }

  updateUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    }).then(this._checkResponse);
  }

  addNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    }).then(this._checkResponse);
  }

  toggleLike(cardId, isLiked) {
    const method = isLiked ? 'PUT' : 'DELETE';

    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method,
      headers: this._headers
    })
    .then(this._checkResponse)
    .then(data => {
      return {
        ...data,
        likes: data.likes || []
      };
    })
    .catch(error => {
      console.error('Error en toggleLike:', error);
      throw error;
    });
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    }).then(this._checkResponse);
  }

  updateAvatar(avatarUrl) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarUrl
      })
    }).then(this._checkResponse);
  }

  setAuthorizationToken(token) {
    this._headers = {
      ...this._headers,
      'Authorization': `Bearer ${token}`
    };
  }

  removeAuthorization(){
    const { Authorization, ...headers } = this._headers;
    this._headers = headers;
  }
}

const api = new Api({
  baseUrl: import.meta.env.MODE === 'production' ? '' : 'http://localhost:3000',
  headers: {
    "Content-Type": "application/json"
  }
});

const token = localStorage.getItem('jwt');
if (token) {
  api.setAuthorizationToken(token);
}

export const setApiToken = (token) => {
  console.log('Setting API token:', token);
  console.log('API instance:', api);
  api.setAuthorizationToken(token);
};

export const removeApiToken = () => {
  console.log('Removing API token');
  console.log('API instance:', api);
  api.removeAuthorization();
};

export default api;