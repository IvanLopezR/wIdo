import React, { Component } from 'react'
import '../sass/main.scss'
import Navbar from './Navbar';
import Footer from './Footer';
import SimpleMap from './Map';
import axios from "axios";

export default class Profile extends Component {
constructor(props){
  super(props);
  this.state = {

  };
}

getCountry = () =>{
    console.log(this.props.country)
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
              <a href="/auth/picture"><img className="profile" src={this.props.imgName} alt={this.props.imgName} /></a>
            </div>
            <div className="data-container">
              <h2>Name: {this.props.name}</h2>
              <h3>User name: {this.props.username}</h3>
              <h3>Nacionality: {this.state.name}</h3>
              <h3>Address: {this.props.address}</h3>
              <h3>Email: {this.props.email}</h3>
              <h3>Phone: {this.props.phone}</h3>
              <h5 class="info-profile">Level: {this.props.range} <span className="separator-info-profile"></span> Friends: {this.props.friends.length}</h5>
              <h5 class="info-profile conquered-countries">Conquered Countries: <img src={this.state.flag} alt={this.state.name} className="flag"></img></h5>
            </div>
          </div>
          {/* <div className="map-profile">
            <SimpleMap API_KEY={process.env.REACT_APP_GOOGLEMAPSAPIKEY}></SimpleMap>
          </div> */}
        </div>
        <Footer></Footer>
      </div>
    )
  }
}
