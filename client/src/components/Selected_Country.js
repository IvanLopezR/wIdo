import React, { Component } from 'react';
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
        return (
            <div className={'background-general background-index-' + Math.floor(Math.random() * 73 + 1)}>
                <div className="container-edit">
                    <div className="countries">
                        <img className="flag-one-country" src={this.state.countries.flag} alt=""></img>
                        <ul>
                            <li className="title-country">{this.state.countries.name}</li>
                            <li className="li-country">Native Name: {this.state.countries.nativeName}</li>
                            <li className="li-country">Capital: {this.state.countries.capital}</li>
                            <li className="li-country">Region: {this.state.countries.region}</li>
                            <li className="li-country">Area: {this.state.countries.area}</li>
                            <li className="li-country">Population: {this.state.countries.population}</li>
                            {/* <li className="li-country">Currencies: {this.state.currencies}</li> */}
                            <li className="li-country">Calling Code: {this.state.countries.callingCodes}</li>
                            <li className="li-country">Time Zones: {this.state.countries.timezones}</li>
                            {/* <li className="li-country">Languages: {this.state.languages}</li> */}
                        </ul>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        )
    }
}
