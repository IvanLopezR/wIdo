import React, { Component } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import axios from "axios";

export default class Community extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countries: []
        };
    }

    getCountries = () => {
        axios.get(`https://restcountries.eu/rest/v2`)
            .then(responseFromApi => {
                const country = responseFromApi.data
                this.setState({
                    ...this.state,
                    countries: country
                })
            })
    }

    componentDidMount() {
        this.getCountries();
    }

    searchCountry(e){
        e = e.target.value.slice(0,1).toUpperCase()+e.target.value.slice(1,e.length);
        let newState = {...this.state};
        let findCountry = newState.countries.filter(ele => ele.name.indexOf(e)
         === 0);
        this.setState({
          ...this.state,
          countries : findCountry
        }
        , 
        () => {
          this.state.countries = [...newState.countries]
        }
        );
      }

    render() {
        return (
            <div className={'background-general background-index-62'}>
                <Navbar logout={this.props.logout}></Navbar>
                <div className="content-adapt">
                    <input className="search-country" placeholder="Find user by name..." onChange={(e) => this.searchCountry(e)}></input>
                    <div className="container-profile">
                        <div className="countries">
                            {this.state.countries.map((feature, idx) => {
                                // return <Country {...feature} key={idx} />
                            })}
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        )
    }
}
