import React, { Component } from 'react'
import '../sass/main.scss'
import Navbar from './Navbar';
import Footer from './Footer';
import axios from "axios";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  getCountry = () => {
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
                <li class="info-profile conquered-countries">Conquered Countries: <img src={this.state.flag} alt={this.state.name} className="flag"></img></li>
              </ul>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    )
  }
}
