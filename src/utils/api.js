class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  // Método auxiliar para manejar la respuesta del servidor
  _handleResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  // Obtener info del usuario
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
    .then(this._handleResponse);
  }

  // Actualizar info del usuario
  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(this._handleResponse);
  }

  // Actualizar avatar
  setUserAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(this._handleResponse);
  }
  
  // Obtener tarjetas iniciales
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, { headers: this._headers })
      .then(this._handleResponse);
  }

  // Crear nueva tarjeta
  addCard(data) {
    return fetch(`${this._baseUrl}/cards/`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(this._handleResponse);
  }

  // Eliminar tarjeta
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._handleResponse);
  }

  // Dar "me gusta"
  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(this._handleResponse);
  }

  // Quitar "me gusta"
  unlikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._handleResponse);
  }
  

changeLikeCardStatus(cardId, shouldBeLiked) { 
    // shouldBeLiked es TRUE si queremos DAR LIKE (PUT).
    // shouldBeLiked es FALSE si queremos QUITAR LIKE (DELETE).
    
    if (shouldBeLiked) {
        // Queremos dar like (PUT)
        return this.likeCard(cardId);
    } else {
        // Queremos quitar like (DELETE)
        return this.unlikeCard(cardId);
    }
}
} // <--- ¡Llave de cierre, es la última de la clase, no borrar!

// Token
export const api = new Api({
  baseUrl: 'https://around-api.es.tripleten-services.com/v1',
  headers: {
    authorization: '6f2d410c-e0cd-4788-883b-32bfa4f6716f',
    'Content-Type': 'application/json'
  }
});