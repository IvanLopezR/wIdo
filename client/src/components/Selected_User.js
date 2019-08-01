import React, { Component } from 'react';
import UserServices from '../Services/UserService';
import Footer from './Footer';
import axios from "axios";
import Map from './Map';
import { Link } from 'react-router-dom';

let countryInfo = {
    name: "",
    flag: ""
}

export default class Selected_User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: {
                id: "",
                username: "",
                email: "",
                imgName: "",
                flag: "",
                name: "",
                range: "",
                following: [],
                followers: [],
                country: "",
                countries: [],
            },
            arrCountries: [],
            country: "",
            countries: [],
            followed: "",
        };
        this.arrayCountries = [];
        this.setLevel = "Neighborhood";
        this.pictLevel = "../Neighborhood.png";
        this.isLoading = false;
        this.service = new UserServices();
    }

    getPropCountry = () => {
        axios.get(`https://restcountries.eu/rest/v2/alpha/${this.state.users.country}`)
            .then(responseFromApi => {
                const coun = responseFromApi.data
                this.setState({
                    ...this.state,
                    country: coun,
                })
            })
        this.getCountries();
    }

    getCountries = () => {
        this.state.users.countries.forEach(country => {
            if (country !== null && this.arrayCountries.indexOf(country) === -1) {
                this.arrayCountries.push(country);
            }
        })
        Promise.all(this.arrayCountries.map(country => {
            return axios.get(`https://restcountries.eu/rest/v2/alpha/${country}`)
                .then((info) => {
                    countryInfo.flag = info.data.flag;
                    countryInfo.name = country
                    return { ...countryInfo }

                })
        }))
            .then((arr) => {
                this.setState({
                    ...this.state,
                    countries: arr,
                })
            })
        if (this.arrayCountries.length > 2 && this.arrayCountries.length < 5) {
            this.setLevel = "Curious";
            this.pictLevel = "../Curious.png"
        }
        else if (this.arrayCountries.length >= 5 && this.arrayCountries.length < 10) {
            this.setLevel = "Adventurous";
            this.pictLevel = "../Adventurous.png"
        }
        else if (this.arrayCountries.length >= 10 && this.arrayCountries.length < 15) {
            this.setLevel = "Jet Lag";
            this.pictLevel = "../JetLag.png"
        }
        else if (this.arrayCountries.length >= 15 && this.arrayCountries.length < 20) {
            this.setLevel = "Cristobal Colón";
            this.pictLevel = "../Colon.svg"
        }
        else if (this.arrayCountries.length >= 20) {
            this.setLevel = "Willy Fog";
            this.pictLevel = "../WillyFog.png"
        }

        this.isLoading = true;
    }

    componentDidMount() {
        this.service.selectUser(this.props.us)
            .then(selectUser => {
                console.log(selectUser)
                this.setState({
                    ...this.state,
                    users: selectUser
                })
                this.getPropCountry();
                if (this.state.users.followers.includes(this.props._id)) {            
                    this.setState({
                        ...this.state,
                        followed:true,
                    })
                }
            });
    }

    follow(e) {
        e.preventDefault()
        this.service.follow(this.props._id, this.props.us)
            .then(res => {
                // console.log('added: ', res);
                // here you would redirect to some other page 
                this.setState({
                    ...this.state,
                    followed:true,
                })
            })
            .catch(err => {
                console.log("Error while adding the thing: ", err);
            });
    }

    unfollow(e) {
        e.preventDefault()
        this.service.unfollow(this.props, this.state.users)
            .then(res => {
                // console.log('added: ', res);
                // here you would redirect to some other page 
                this.setState({
                    ...this.state,
                    followed:false,
                })
            })
            .catch(err => {
                console.log("Error while adding the thing: ", err);
            });
    }

    render() {
        console.log("Usuario Actual: ")
        console.log(this.props)
        console.log("Usuario Vista: ")
        console.log(this.state.users)
        if (this.isLoading) {
            return (
                <div className={'background-general background-index-' + Math.floor(Math.random() * 73 + 1)}>
                    <div className="content-adapt">
                        <div className="container-profile">
                            <div className="pict-follow">
                                <img className="profile" src={this.state.users.imgName} alt={this.state.users.imgName} title={this.state.users.name} />
                                {console.log(this.state.followed)}
                                {this.state.followed ? (
                                    <button id="follow-btn" className="follow-btn-not" onClick={e => this.unfollow(e)}>Unfollow</button>
                                    ) : (
                                        <button id="follow-btn" className="follow-btn-ok" onClick={e => this.follow(e)}>Follow</button>
                                )}
                            </div>
                            <div className="data-container">
                                <Link to={"/country/" + this.state.users.country} ><img src={this.state.country.flag} className="flag-address" alt={this.state.country.name} title={this.state.country.name}></img></Link>
                                <div className="unit-name-level">
                                    <h2>{this.state.users.name} ({this.state.users.username})</h2>
                                    <img src={this.pictLevel} className="img-level-home" alt={this.setLevel} title={this.setLevel}></img>
                                </div>
                                <h5 className="info-profile">Level: {this.setLevel} <span className="separator-info-profile"></span> Following: {this.state.users.following.length} <span className="separator-info-profile"></span> Followers: {this.state.users.followers.length}</h5>
                                <h5 className="info-profile conquered-countries">Conquered Countries: </h5>
                                <div>
                                    {this.state.countries.map(coun => {
                                        return <Link to={"/country/" + coun.name} ><img src={coun.flag} alt={coun.name} title={coun.name} className="flag"></img></Link>
                                    }
                                    )}
                                </div>
                            </div>
                        </div>
                        < div className="map-profile">
                            <Map user={this.props.us}></Map>
                        </div>
                    </div>
                    <Footer></Footer>
                </div>
            )
        }
        else {
            return <h1>Loading...</h1>
        }
    }
}
