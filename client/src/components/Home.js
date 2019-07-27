import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import '../sass/main.scss'
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
    })
  }

  componentDidMount() {
    this.getCountry();
}

  render() {
    return (
      <div className={'background-general background-index-' + Math.floor(Math.random() * 73 + 1)}>
        <div className="content-adapt">
          <div className="container-profile">
            <div>
            <Link to={"../profile"}><img className="profile" src={this.props.imgName} alt={this.props.imgName} /></Link>
            </div>
            <div className="data-container">
            <Link to={"/country/" + this.state.alpha3Code} ><img src={this.state.flag} className="flag-address" alt={this.state.name}></img></Link>
              <h2><Link className="link-profile" to={"../profile"}>{this.props.name}</Link></h2>
              <h5 className="info-profile">Level: {this.props.range} <span className="separator-info-profile"></span> Following: {this.props.following.length} <span className="separator-info-profile"></span> Followers: {this.props.followers.length}</h5>
              <h5 className="info-profile conquered-countries">Conquered Countries: <Link to={"/country/" + this.state.alpha3Code} ><img src={this.state.flag} alt={this.state.name} className="flag"></img></Link></h5>
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

