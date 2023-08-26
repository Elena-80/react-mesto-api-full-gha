
class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    // this._headers = options.headers;
  }


  _checkResult(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  _request(endpoint, options) {
    return fetch((`${this._baseUrl}` + endpoint), options).then(this._checkResult)
  }

  getInitialCards() {
    return this._request('/cards', 
    {headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    },
  })
}

  getUserInfo() {
    return this._request('/users/me', 
    {headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    },
  })
  }


  sendUserInfo(data) {
    return this._request('/users/me',  {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    },
    body: JSON.stringify({
      name: data.name,
      about: data.about
    })
  })
}

  sendPictureInfo(data) {
    return this._request('/cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
  }

  deleteCard(id) {
    return this._request(`/cards/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
    })
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return this.deleteLikes(id);
    } else {
      return this.sendLikes(id);
    }
  }

  sendLikes(id) {
    return this._request(`/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
    })
  }

  deleteLikes(id) {
    return this._request(`/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
    })
  }

  sendNewAvatar(avatarLink) {
    return this._request(`/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    },
    body: JSON.stringify({
      avatar: avatarLink
    })
  })
  }

}

const api = new Api({
  baseUrl: 'https://api.mesto80.students.nomoredomainsicu.ru',
  // baseUrl: 'http://localhost:3000',
  // headers: {
  //   'Content-Type': 'application/json',
  //   'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
  // },
});

export default api;