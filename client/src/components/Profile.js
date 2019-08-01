import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import axios from "axios";
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
      countries: [],
    }
    this.arrayCountries = [];
    this.isLoading = false;
    this.setLevel = "Neighborhood";
    this.pictLevel = "Neighborhood.png";
    this.qrCode = `https://wido-social-media.herokuapp.com/User/${this.props._id}`;
  }

  getPropCountry = () => {
    axios.get(`https://restcountries.eu/rest/v2/alpha/${this.props.country}`)
      .then(responseFromApi => {
        const coun = responseFromApi.data
        this.setState({
          ...this.state,
          country: coun,
        })
      })
  }

  getCountries = () => {
    this.props.countries.forEach(country => {
      if (country !== null && this.arrayCountries.indexOf(country) === -1) {
        this.arrayCountries.push(country);
      }
    })
    Promise.all(this.arrayCountries.map(country => {
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

    if (this.arrayCountries.length > 2 && this.arrayCountries.length < 5) {
      this.setLevel = "Curious";
      this.pictLevel = "Curious.png"
    }
    else if (this.arrayCountries.length >= 5 && this.arrayCountries.length < 10) {
      this.setLevel = "Adventurous";
      this.pictLevel = "Adventurous.png"
    }
    else if (this.arrayCountries.length >= 10 && this.arrayCountries.length < 15) {
      this.setLevel = "Jet Lag";
      this.pictLevel = "JetLag.png"
    }
    else if (this.arrayCountries.length >= 15 && this.arrayCountries.length < 20) {
      this.setLevel = "Cristobal Colón";
      this.pictLevel = "Colon.svg"
    }
    else if (this.arrayCountries.length >= 20) {
      this.setLevel = "Willy Fog";
      this.pictLevel = "WillyFog.png"
    }

    this.isLoading = true;
  }

  componentDidMount() {
    this.getCountries();
    this.getPropCountry();
  }


  render() {
    if (this.isLoading) {
      return (
        <div className={'background-general background-index-' + Math.floor(Math.random() * 73 + 1)}>
          <div className="content-adapt">
            <div className="container-profile">
              <div>
                <img className="profile" title={this.props.name} src={this.props.imgName} alt={this.props.imgName} />
              </div>
              <div className="data-container">
                <div className="unit-name-level">
                  <h1>{this.props.name}</h1>
                  <img src={this.pictLevel} className="img-level-home" alt={this.setLevel} title={`Level ${this.setLevel}`}></img>
                </div>
                <ul>
                  <li className="li-country">User name: {this.props.username}</li>
                  <li className="li-country">Nacionality: {this.state.country.name}</li>
                  <li className="li-country">Address: {this.props.address}</li>
                  <li className="li-country">Email: {this.props.email}</li>
                  <li className="li-country">Phone: {this.props.phone}</li>
                  <li className="li-country">Following: {this.props.following.length}</li>
                  <li className="li-country">Followers: {this.props.followers.length}</li>
                  <li className="li-country">Level: {this.setLevel}</li>
                  <li className="info-profile conquered-countries li-country">Conquered Countries:
                    {this.state.countries.map(coun => {
                      return <Link to={"/country/" + coun.name} ><img src={coun.flag} alt={coun.name} title={coun.name} className="flag"></img></Link>
                    }
                    )}
                  </li>
                </ul>
              </div>
                    <QRCode className="qr-code" value={this.qrCode} />
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
