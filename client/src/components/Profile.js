import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import axios from "axios";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  getCountry = () => {
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
    console.log(this.props)
    return (
      <div className={'background-general background-index-' + Math.floor(Math.random() * 73 + 1)}>
        <div className="content-adapt">
          <div className="container-profile">
            <div>
              <img className="profile" src={this.props.imgName} alt={this.props.imgName} />
            </div>
            <div className="data-container">
              <h1>{this.props.name}</h1>
              <ul>
                <li className="li-country">User name: {this.props.username}</li>
                <li className="li-country">Nacionality: {this.state.name}</li>
                <li className="li-country">Address: {this.props.address}</li>
                <li className="li-country">Email: {this.props.email}</li>
                <li className="li-country">Phone: {this.props.phone}</li>
                <li className="li-country">Level: {this.props.range}</li> 
                <li className="li-country">Following: {this.props.following.length}</li>
                <li className="li-country">Followers: {this.props.followers.length}</li>
                <li className="info-profile conquered-countries li-country">Conquered Countries: <Link to={"/country/" + this.state.alpha3Code} ><img src={this.state.flag} alt={this.state.name} className="flag"></img></Link></li>
              </ul>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    )
  }
}
