import axios from 'axios';

export default class AuthServices {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_URL}/auth`,
      withCredentials: true,
    })
  }

  signup = (username, password, name, email, country) => {
    return this.service.post('/signup', { username, password, name, email, country })
      .then(response => response.data);
  }

  login = (username, password) => {
    return this.service.post('/login', { username, password })
      .then(response => response.data);
  }

  invite = (emailFriend) => {
    return this.service.post('/invite', { emailFriend })
      .then(response => response.data);
  }

  changePassword = (passwordNew, passwordNew2, password) => {
    return this.service.post('/changePassword', { passwordNew, passwordNew2, password })
    .then(response => response.data)
    .catch((err) => {
      console.log(err)
    })
  }

  loggedIn = () => {
    return this.service.get('/loggedin')
      .then(response => response.data);
  }

  logout = () => {
    return this.service.get('/logout')
    .then(response => response.data);
  }

}