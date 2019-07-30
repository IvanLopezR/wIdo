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
                username: "",
                email: "",
                imgName: "",
                flag: "",
                name: "",
                range: "",
                following: "",
                followers: "",
                country: "",
                countries: [],
            },
            country: {
                country: "",
                alpha3Code: "",
                flag:"",
            }
        };
        this.idBtn = "follow-btn";
        this.service = new UserServices();
    }

    getCountry = () => {
        axios.get(`https://restcountries.eu/rest/v2/alpha/${this.state.users.country}`)
            .then(responseFromApi => {
                const country = responseFromApi.data
                this.setState({
                    ...this.state.users,
                    country: country,
                });
            })
    }

    getCountries = (country) => {
        axios.get(`https://restcountries.eu/rest/v2/alpha/${country}`)
        .then(responseFromApi => {
            const country = responseFromApi.data
            this.setState({
                ...this.state,
                country: country,
            });
        })
    }

    componentDidMount() {
        if(this.props.us===this.props._id){
            document.getElementById(this.idBtn).hidden = true; 
        }
        this.service.selectUser(this.props.us)
            .then(selectUser => {
                this.setState({
                    ...this.state,
                    users: selectUser
                })
                this.getCountry();
                // document.getElementById(this.idBtn).innerHTML = "unfollow";
                // document.getElementById("follow-btn").style.backgroundColor = "red";   
            });
    }

    render() {
        return (
            <div className={'background-general background-index-' + Math.floor(Math.random() * 73 + 1)}>
                <div className="content-adapt">
                    <div className="container-profile">
                        <div className="pict-follow">
                            <Link to={"../profile"}><img className="profile" src={this.state.users.imgName} alt={this.state.users.imgName} /></Link>
                            <button id="follow-btn" className="follow-btn">Follow</button>
                        </div>
                        <div className="data-container">
                            <Link to={"/country/" + this.state.country.alpha3Code} ><img src={this.state.country.flag} className="flag-address" alt={this.state.users.name}></img></Link>
                            <h2><Link className="link-profile" to={"../profile"}>{this.state.users.name}</Link></h2>
                            <h5 className="info-profile">Level: {this.state.users.range} <span className="separator-info-profile"></span> Following: {this.state.users.following.length} <span className="separator-info-profile"></span> Followers: {this.state.users.followers.length}</h5>
                            <h5 className="info-profile conquered-countries">Conquered Countries: </h5>
                            <div>                                
                                {this.state.users.countries.map(country => {
                                    this.getCountries(country);
                                    return (
                                        <Link to={"/country/" + country} ><img src={this.state.country.flag} alt={this.state.country.flag} className="flag"></img></Link>

                                         /* <div className="container-in"> */
                                             /* <div className="container-pict"> */
                                                 /* <img src={beer.image_url} className="beer-pict"></img> */
                                             /* </div> */
                                             /* <div className="container-text key={beer._id}"> */
                                                 /* <h2 className="name-beers"><Link to={`/detail/${beer._id}`} className="link">{beer.name}</Link></h2> */
                                                 /* <h3 className="tagline">{beer.tagline}</h3> */
                                                 /* <p><span className="contributed">Created by:</span> {beer.contributed_by}</p> */
                                             /* </div> */
                                         /* </div> */
                                    /* ) */
                                /* }) */
                                /* } */
                                          /* {this.props.countries.map(country => { */
                                             /* return <Link to={"/country/" + country} ><img src={this.state.country.flag} alt={this.state.country.name} className="flag"></img></Link> */
                                    /* //     }) */
                                    )}
                                )}
                            </div>
                        </div>
                    </div>
                < div className="map-profile">
                    <Map user={this.props._id}></Map>
                </div>
            </div>
            <Footer></Footer>
        </div>
        )
    }
}
