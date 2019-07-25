import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import '../sass/main.scss'
import Navbar from './Navbar';
import Footer from './Footer';
import SimpleMap from './Map';
import axios from "axios";

export default class Home extends Component {
constructor(props){
  super(props);
  this.state = {

  };
}

getCountry = () =>{
    axios.get(`https://restcountries.eu/rest/v2/alpha/${this.props.country}`)
    .then(responseFromApi => {
      const country = responseFromApi.data
      this.setState(country);
      console.log(this.state);   
    })
  }

  componentDidMount() {
    this.getCountry();
}

  render() {
    console.log(this.props.country)
    console.log(this.state);
    return (
      <div className={'background-general background-index-' + Math.floor(Math.random() * 73 + 1)}>
        <Navbar logout={this.props.logout}></Navbar>
        <div className="content-adapt">
          <div className="container-profile">
            <div>
            <Link to={"../profile"}><img className="profile" src={this.props.imgName} alt={this.props.imgName} /></Link>
            </div>
            <div className="data-container">
              <img src={this.state.flag} className="flag-address" alt={this.state.name}></img> 
              <h2><Link className="link-profile" to={"../profile"}>{this.props.name}</Link></h2>
              <h5 class="info-profile">Level: {this.props.range} <span className="separator-info-profile"></span> Friends: {this.props.friends.length}</h5>
              <h5 class="info-profile conquered-countries">Conquered Countries: <img src={this.state.flag} alt={this.state.name} className="flag"></img></h5>
            </div>
          </div>
          <div className="map-profile">
            <SimpleMap API_KEY={process.env.REACT_APP_GOOGLEMAPSAPIKEY}></SimpleMap>
          </div>
        </div>
        <Footer></Footer>
      </div>
    )
  }
}

