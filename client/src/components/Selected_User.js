import React, { Component } from 'react';
import UserServices from '../Services/UserService';
import Footer from './Footer';
import axios from "axios";
import Map from './Map';
import { Link } from 'react-router-dom';

export default class Selected_User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: {
                username:"",
                email:"",
                imgName: "",
                flag: "",
                name: "",
                range: "",
                following: "",
                followers: "",
                country:"",
            },
            country: {
                country: "",
                alpha3Code:""
            }
        };
        this.service = new UserServices();
    }

    getCountry = () => {
        axios.get(`https://restcountries.eu/rest/v2/alpha/${this.state.users.country}`)
            .then(responseFromApi => {
                const country = responseFromApi.data
                this.setState({
                    ...this.state,
                    country: country,
                });
            })
    }

    componentDidMount() {
        this.service.selectUser(this.props.us)
        .then(selectUser => {
                this.setState({
                    ...this.state,
                    users: selectUser
                })
                this.getCountry();
            });
    }

    render() {
        return (
            <div className={'background-general background-index-' + Math.floor(Math.random() * 73 + 1)}>
                <div className="content-adapt">
                    <div className="container-profile">
                        <div>
                            <Link to={"../profile"}><img className="profile" src={this.state.users.imgName} alt={this.state.users.imgName} /></Link>
                        </div>
                        <div className="data-container">
                            <Link to={"/country/" + this.state.country.alpha3Code} ><img src={this.state.country.flag} className="flag-address" alt={this.state.users.name}></img></Link>
                            <h2><Link className="link-profile" to={"../profile"}>{this.state.users.name}</Link></h2>
                            <h5 className="info-profile">Level: {this.state.users.range} <span className="separator-info-profile"></span> Following: {this.state.users.following.length} <span className="separator-info-profile"></span> Followers: {this.state.users.followers.length}</h5>
                            <h5 className="info-profile conquered-countries">Conquered Countries: <Link to={"/country/" + this.state.country.alpha3Code} ><img src={this.state.country.flag} alt={this.state.country.name} className="flag"></img></Link></h5>
                        </div>
                    </div>
                    <div className="map-profile">
                        <Map></Map>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        )
    }
}
