import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import axios from "axios";
import UserService from '../Services/UserService';
import ZoomImg from './ZoomImg';
var QRCode = require('qrcode.react');

let countryInfo = {
  name: "",
  flag: ""
}

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrCountries: [],
      country: "",
      countries:[],
      followe: 0,
      followi: 0,
      setLevel: "",
      pictLevel: "",
      user: {
        name:"",
        username:"",
        address:"",
        phone:"",
        email:"",
      }
    }
    this.arrayCountries = [];
    this.isLoading = false;
    this.qrCode = `https://wido-social-media.herokuapp.com/User/${this.props._id}`;
    this.services = new UserService();
  }

  getPropCountry = () => {
    axios.get(`https://restcountries.eu/rest/v2/alpha/${this.state.country}`)
      .then(responseFromApi => {
        const coun = responseFromApi.data
        this.setState({
          ...this.state,
          country: coun,
        })
      })
  }

  getCountries = () => {
    this.state.user.countries.forEach(country => {
      if (country !== null && this.state.arrCountries.indexOf(country) === -1) {
        this.state.arrCountries.push(country);
      }
    })
    Promise.all(this.state.arrCountries.map(country => {
      return axios.get(`https://restcountries.eu/rest/v2/alpha/${country}`)
        .then((info) => {
          countryInfo.flag = info.data.flag;
          countryInfo.name = country
          return { ...countryInfo }
        })
    }))
      .then((arr) => {
        this.setState({
          ...this.state,
          countries: arr,
        })
      })

    if (this.state.arrCountries.length == 0) {
      this.setState({
        setLevel: "Neighborhood",
        pictLevel: "Neighborhood.png"
      })
    }
    if (this.state.arrCountries.length > 0 && this.state.arrCountries.length < 3) {
      this.setState({
        setLevel: "Curious",
        pictLevel: "Curious.png"
      })
    }
    else if (this.state.arrCountries.length >= 3 && this.state.arrCountries.length < 5) {
      this.setState({
        setLevel: "Adventurous",
        pictLevel: "Adventurous.png"
      })
    }
    else if (this.state.arrCountries.length >= 5 && this.state.arrCountries.length < 10) {
      this.setState({
        setLevel: "Jet Lag",
        pictLevel: "JetLag.png"
      })
    }
    else if (this.state.arrCountries.length >= 10 && this.state.arrCountries.length < 15) {
      this.setState({
        setLevel: "Cristobal Colón",
        pictLevel: "Colon.svg"
      })
    }
    else if (this.state.arrCountries.length >= 15) {
      this.setState({
        setLevel: "Willy Fog",
        pictLevel: "WillyFog.png"
      })
    }

    this.isLoading = true;
  }

  componentDidMount() {
    this.services.selectUser(this.props._id)
      .then(res => {
        this.setState({
          ...this.state,
          followe: res.followers.length,
          followi: res.following.length,
          country: res.country,
          user: {
            name: res.name,
            username:res.username,
            address:res.address,
            countries: res.countries,
            email:res.email,
            phone:res.phone,
          }
        })
        this.getCountries();
        this.getPropCountry();
      })
    }
    
    
    render() {
      if (this.isLoading) {
      return (
        <div className={'background-general background-index-' + Math.floor(Math.random() * 73 + 1)}>
          <div className="content-adapt">
            <div className="container-profile">
              <div clasName="pict-qr">
                <img className="profile" title={this.props.name} src={this.props.imgName} alt={this.props.imgName} />
                <div>
                  <QRCode className="qr-code" value={this.qrCode} />
                </div>
              </div>
              <div className="data-container">
                <div className="unit-name-level">
                  <h1>{this.state.user.name}</h1>
                  <img src={this.state.pictLevel} className="img-level-home" alt={this.state.setLevel} title={`Level ${this.state.setLevel}`}></img>
                </div>
                <ul>
                  <li className="li-country">User name: {this.state.user.username}</li>
                  <li className="li-country">Nacionality: {this.state.country.name}</li>
                  <li className="li-country">Address: {this.state.user.address}</li>
                  <li className="li-country">Email: {this.state.user.email}</li>
                  <li className="li-country">Phone: {this.state.user.phone}</li>
                  <li className="li-country">Following: {this.state.followi}</li>
                  <li className="li-country">Followers: {this.state.followe}</li>
                  <li className="li-country">Level: {this.state.setLevel}</li>
                  <li className="info-profile conquered-countries li-country">Conquered Countries:
                    {this.state.countries.map(coun => {
                    return <Link to={"/country/" + coun.name} ><img src={coun.flag} alt={coun.name} title={coun.name} className="flag"></img></Link>
                  }
                  )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <Footer></Footer>
        </div>
      )
    }
    else {
      return <h1>Loaging...</h1>
    }
  }
}
