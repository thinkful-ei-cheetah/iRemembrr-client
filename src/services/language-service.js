import config from '../config';
import TokenService from './token-service';

export default {
  getLanguageWords() {
      return fetch (`${config.API_ENDPOINT}/language`, {
        headers: {
          'authorization': `bearer ${TokenService.getAuthToken()}`
        }
      })
        .then(res => {
          return (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        })
    },
  
    getLanguageHead() {
      return fetch(`${config.API_ENDPOINT}/language/head`, {
        headers: {
          'authorization': `bearer ${TokenService.getAuthToken()}`
        }
      })
      .then(res => {
        return (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      })
    },

  postAnswer(answer) {
    return fetch(`${config.API_ENDPOINT}/language/answer`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({answer})
    })
    .then(res => {
      return (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    })
  }
}