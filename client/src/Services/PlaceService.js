import axios from 'axios';

export default class PlaceServices {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_URL}/place`,
      withCredentials: true,
    })
  }

  places = () => {
    return this.service.get('/places')
    .then(response => response.data)
  }

  placePicture = picture => {
    console.log(picture);
    return this.service.post('/changePicture', picture)
    .then(res => res.data)
  }

  saveNewThing = (title, imgName, lat, lng, type, author, timestamps) => {
    console.log(title);
    console.log(imgName);
    console.log(lat);
    console.log(lng);
    console.log(type);
    console.log(author);
    return this.service.post('/create', { title, imgName, lat, lng, type, author, timestamps })
      .then(res => {
        console.log(res)

        return res.data})
  }

}