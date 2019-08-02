import axios from 'axios';

export default class UserServices {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_URL}/user`,
      withCredentials: true,
    })
  }

  allUsers = () => {
    return this.service.get('/community')
    .then(response => response.data)
  }

  selectUser = (id) => {
    return this.service.get(`/userDetails/${id}`)
    .then(response => response.data)
  }

  userPlaces = (id) => {
    return this.service.post('/userPlaces', {id})
    .then(response => response.data)
  }

  userCountries = (country) => {
    return this.service.post('/userCountries', {country})
    .then(response => response.data)
  }

  editProfile = (name, address, country, email, phone, id) => {
    return this.service.put('/editProfile/:id', { name, address, country, email, phone, id })
    .then(response => response.data)
  }

  changePicture = picture => {
    return this.service.post('/changePicture', picture)
    .then(res => res.data)
  }

  saveNewThing = newThing => {
    return this.service.post('/things/create', {newThing})
      .then(res => res.data)
  }

  findUserPlaces = userId => {
    return this.service.post('/findUserPlaces', {userId})
    .then(res => res.data)
  }

  follow = (ownId, userId) => {
    return this.service.post('/follow', {ownId, userId})
    .then(res => res.data)
  }

  unfollow = (own, user) => {
    console.log("Yo")
    console.log(own)
    console.log("Vista")
    console.log(user)
    return this.service.post('/unfollow', {own, user})
    .then(res => res.data)
  }

  followers = userId => {
    return this.service.get(`/followers/${userId}`)
    .then(res => res.data)
  }

  following = userId => {
    return this.service.get(`/following/${userId}`)
    .then(res => res.data)
  }

  getUserExtend = userId => {
    return this.service.get(`/userExtend/${userId}`)
    .then(res => res.data)
  }

  changeInCountries = (id, newArray) => {
    return this.service.post('/changeInCountries', {id, newArray})
    .then(res => res.data)
  }

}