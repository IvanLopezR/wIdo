import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import '../sass/main.scss'
import Footer from './Footer';
import Map from './Map';
import axios from "axios";
import UserService from '../Services/UserService';

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
      followe: "",
      followi: "",
      setLevel: "",
      pictLevel: "",
      user:{
        countries:[],
      }
    }
    this.arrayCountries = [];
    this.isLoading = false;
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
    Promise.all(this.state.arrCountries.map(country=>{
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
        user:{
          countries: arr,
        }
      })
    })
    if(this.state.arrCountries.length===0){
      this.setState({
        ...this.state,
        setLevel : "Neighborhood",
        pictLevel : "Neighborhood.png"
      })
    }
    if (this.state.arrCountries.length > 0 && this.state.arrCountries.length < 3) {
      this.setState({
        ...this.state,
        setLevel : "Curious",
        pictLevel : "Curious.png"
      })
    }
    else if (this.state.arrCountries.length >= 3 && this.state.arrCountries.length < 5) {
      this.setState({
        setLevel : "Adventurous",
        pictLevel :  "Adventurous.png"
      })
    }
    else if (this.state.arrCountries.length >= 5 && this.state.arrCountries.length < 10) {
      this.setState({
        ...this.state,
        setLevel : "Jet Lag",
        pictLevel : "JetLag.png"
      })
    }
    else if (this.state.arrCountries.length >= 10 && this.state.arrCountries.length < 15) {
      this.setState({
        ...this.state,
        setLevel : "Cristobal Colón",
        pictLevel : "Colon.svg"
      })
    }
    else if (this.state.arrCountries.length >= 15) {
      this.setState({
        ...this.state,
        setLevel : "Willy Fog",
        pictLevel : "WillyFog.png"
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
          user:{
            countries: res.countries,
          }
      })
      this.getPropCountry();
      this.getCountries();
    })
  }

  render() {
    console.log(this.state.user.countries)
    if(this.isLoading){
      return (
        <div className={'background-general background-index-' + Math.floor(Math.random() * 73 + 1)}>
          <div className="content-adapt">
            <div className="container-profile">
              <div>
                <Link to={"../profile"}><img className="profile" src={this.props.imgName} alt={this.props.imgName} title={this.props.name}/></Link>
              </div>
              <div className="data-container">
                <Link to={"/country/" + this.state.country.alpha3Code} ><img src={this.state.country.flag} className="flag-address" alt={this.state.country.name} title={this.state.country.name}></img></Link>
                <div className="unit-name-level">
                  <h2><Link className="link-profile" to={"../profile"}>{this.props.name}</Link></h2>
                  <img src={this.state.pictLevel} className="img-level-home" alt={this.state.setLevel} title={`Level ${this.setLevel}`}></img>
                </div>
                <h5 className="info-profile">Level: {this.state.setLevel} <span className="separator-info-profile"></span> Following: {this.state.followi} <span className="separator-info-profile"></span> Followers: {this.state.followe}</h5>
                <h5 className="info-profile conquered-countries">Conquered Countries:
                {this.state.user.countries.map(coun => {
                  return <Link to={"/country/" + coun.name} ><img src={coun.flag} alt={coun.name} title={coun.name} className="flag"></img></Link>
                }
                )}
                </h5>
              </div>
            </div>
            <div className="map-profile">
              <Map community={this.props} loggedInUser={this.props}></Map>
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

