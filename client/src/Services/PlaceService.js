import axios from 'axios';

export default class PlaceServices {
  constructor() {
    this.service = axios.create({
      baseURL: ('http://localhost:5000/place'),
      withCredentials: true,
    })
  }

  places = () => {
    console.log("entro")
    return this.service.get('/places')
    .then(response => response.data)
  }

}