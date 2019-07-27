import axios from 'axios';

export default class UserServices {
  constructor() {
    this.service = axios.create({
      baseURL: ('http://localhost:5000/user'),
      withCredentials: true,
    })
  }

  allUsers = () => {
    return this.service.get('/community')
    .then(response => response.data)
  }

  editProfile = (name, address, country, email, phone) => {
    return this.service.get('/editProfile/:id', { name, address, country, email, phone })
    .then(response => response.data)
  }

}