import React, { Component } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import axios from "axios";

export default class Selected_Country extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countries: []
        };
    }

    getCountry = () => {
        axios.get(`https://restcountries.eu/rest/v2/alpha/${this.props.coun}`)
            .then(responseFromApi => {
                const country = responseFromApi.data
                this.setState({
                    ...this.state,
                    countries: country 
                });
            })
    }

    componentDidMount() {
        this.getCountry();
    }
    render() {
        let borderClone = this.state.countries.borders
        console.log(JSON.parse().stringify(borderClone))
        // console.log(this.state.currencies)
        return (
            <div className={'background-general background-index-' + Math.floor(Math.random() * 73 + 1)}>
                <Navbar logout={this.props.logout}></Navbar>
                <div className="content-adapt">
                    <div className="container-profile">
                        <div className="countries">
                            <img className="flag-one-country" src={this.state.flag}></img>
                            <ul>
                                {/* <li className="title-country">{this.state.name}</li>
                                <li className="li-country">Native Name: {this.state.nativeName}</li>
                                <li className="li-country">Capital: {this.state.capital}</li>
                                <li className="li-country">Region: {this.state.region}</li>
                                <li className="li-country">Area: {this.state.area}</li>
                                <li className="li-country">Population: {this.state.population}</li> */}
                                {/* <li className="li-country">Currencies: {this.state.currencies}</li> */}
                                {/* <li className="li-country">Calling Code: {this.state.callingCodes}</li>
                                <li className="li-country">Time Zones: {this.state.timezones}</li> */}
                                {/* <li className="li-country">
                                    Borders: {
                                        this.state.borders.map(border => console.log(border))
                                        }
                                </li> */}
                                {/* <li className="li-country">Languages: {this.state.languages}</li> */}
                            </ul>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        )
    }
}
