import React, { Component } from 'react';
import UserServices from '../Services/UserService';
import Footer from './Footer';
import axios from "axios";
import SimpleMap from './Map';
import { Link } from 'react-router-dom';

export default class Selected_User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
        this.service = new UserServices();
    }

    getCountry = () =>{
        axios.get(`https://restcountries.eu/rest/v2/alpha/${this.state.users.country}`)
        .then(responseFromApi => {
          const country = responseFromApi.data
          this.setState(country);
          console.log(this.state);   
        })
      }

    getUser = () => {
        axios.get(`http://localhost:5000/user/userDetails/${this.props.us}`)
            .then(responseFromApi => {
                const user = responseFromApi.data
                this.setState({
                    ...this.state,
                    users: user
                });
            })
    }

    componentDidMount() {
        this.getUser();
        // this.getCountry();
    }

    render() {
        console.log(this.state.users)
        return (
            <div className={'background-general background-index-' + Math.floor(Math.random() * 73 + 1)}>
                <div className="content-adapt">
                    <div className="container-profile">
                        <div>
                            <Link to={"../profile"}><img className="profile" src={this.state.users.imgName} alt={this.state.users.imgName} /></Link>
                        </div>
                        <div className="data-container">
                            <Link to={"/country/" + this.state.users.alpha3Code} ><img src={this.state.users.flag} className="flag-address" alt={this.state.users.name}></img></Link>
                            <h2><Link className="link-profile" to={"../profile"}>{this.state.users.name}</Link></h2>
                            <h5 className="info-profile">Level: {this.state.users.range} <span className="separator-info-profile"></span> Following: {this.state.users.following} <span className="separator-info-profile"></span> Followers: {this.state.users.followers}</h5>
                            <h5 className="info-profile conquered-countries">Conquered Countries: <Link to={"/country/" + this.state.users.alpha3Code} ><img src={this.state.users.flag} alt={this.state.users.name} className="flag"></img></Link></h5>
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
