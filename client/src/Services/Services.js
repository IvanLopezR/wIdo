import axios from 'axios';

export default class AuthServices {
  constructor() {
    this.service = axios.create({
      baseURL: ('http://localhost:5000/auth'),
      withCredentials: true,
    })
  }

  signup = (username, password, name, email) => {
    debugger
    return this.service.post('/signup', { username, password, name, email })
      .then(response => response.data);
  }

  login = (username, password) => {
    return this.service.post('/login', { username, password })
      .then(response => response.data);
  }

  loggedIn = () => {
    return this.service.get('/userData')
      .then(response => response.data);
  }

  logout = () => {
    return this.service.get('/logout')
    .then(response => response.data);
  }

}