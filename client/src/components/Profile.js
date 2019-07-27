import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../sass/main.scss'
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
                <li>User name: {this.props.username}</li>
                <li>Nacionality: {this.state.name}</li>
                <li>Address: {this.props.address}</li>
                <li>Email: {this.props.email}</li>
                <li>Phone: {this.props.phone}</li>
                <li>Level: {this.props.range}</li> 
                <li>Friends: {this.props.friends.length}</li>
                <li className="info-profile conquered-countries">Conquered Countries: <Link to={"/country/" + this.state.alpha3Code} ><img src={this.state.flag} alt={this.state.name} className="flag"></img></Link></li>
              </ul>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    )
  }
}
