import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import '../sass/main.scss'
import Footer from './Footer';
import Map from './Map';
import axios from "axios";

let countryInfo = {
  name: "",
  flag: ""
}

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrCountries: [],
      country: "",
      countries:[],
    }
    this.arrayCountries = [];
    this.isLoading = false;
    this.setLevel = "Neighborhood";
    this.pictLevel = "Neighborhood.png";
  }

  getPropCountry = () => {
    axios.get(`https://restcountries.eu/rest/v2/alpha/${this.props.country}`)
      .then(responseFromApi => {
        const coun = responseFromApi.data
        this.setState({
          ...this.state,
          country:coun,
        })
      })
  }

  getCountries = () => {
    this.props.countries.forEach(country => {
      if (country !== null && this.arrayCountries.indexOf(country) === -1) {
        this.arrayCountries.push(country);
      }
    })
    Promise.all(this.arrayCountries.map(country=>{
      return axios.get(`https://restcountries.eu/rest/v2/alpha/${country}`)
      .then((info)=>{
         countryInfo.flag = info.data.flag;
         countryInfo.name = country
         return {...countryInfo}

      })
    }))
    .then((arr)=>{
      this.setState({
        ...this.state,
        countries:arr,
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
    this.getPropCountry();
    this.getCountries();
  }

  render() {
    if(this.isLoading){
      return (
        <div className={'background-general background-index-' + Math.floor(Math.random() * 73 + 1)}>
          <div className="content-adapt">
            <div className="container-profile">
              <div>
                <Link to={"../profile"}><img className="profile" src={this.props.imgName} alt={this.props.imgName} title={this.props.name}/></Link>
              </div>
              <div className="data-container">
                <Link to={"/country/" + this.state.country.alpha3Code} ><img src={this.state.country.flag} className="flag-address" alt={this.state.country.name}></img></Link>
                <div className="unit-name-level">
                  <h2><Link className="link-profile" to={"../profile"}>{this.props.name}</Link></h2>
                  <img src={this.pictLevel} className="img-level-home" alt={this.setLevel} title={`Level ${this.setLevel}`}></img>
                </div>
                <h5 className="info-profile">Level: {this.setLevel} <span className="separator-info-profile"></span> Following: {this.props.following.length} <span className="separator-info-profile"></span> Followers: {this.props.followers.length}</h5>
                <h5 className="info-profile conquered-countries">Conquered Countries:
                {this.state.countries.map(coun => {
                  return <Link to={"/country/" + coun.name} ><img src={coun.flag} alt={coun.name} title={coun.name} className="flag"></img></Link>
                }
                )}
                </h5>
              </div>
            </div>
            <div className="map-profile">
              <Map user={this.props}></Map>
            </div>
          </div>
          <Footer></Footer>
        </div>
      )
    }
    else{
      return <h1>Loading...</h1>    
    }
  }
}

