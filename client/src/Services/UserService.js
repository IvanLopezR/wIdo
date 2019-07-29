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

  selectUser = (id) => {
    return this.service.post('/userDetails/:id', {id})
    .then(response => response.data)
  }

  editProfile = (name, address, country, email, phone, id) => {
    return this.service.put('/editProfile/:id', { name, address, country, email, phone, id })
    .then(response => response.data)
  }

  changePicture = picture => {
    console.log(picture);
    return this.service.post('/changePicture', picture)
    .then(res => res.data)
  }

  saveNewThing = newThing => {
    console.log("Datos que pasan"+newThing)
    return this.service.post('/things/create', {newThing})
      .then(res => res.data)
  }

}