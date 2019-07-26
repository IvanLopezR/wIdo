import React, { Component } from 'react'
import { Link, Route, withRouter } from 'react-router-dom';

export default class Country extends Component {
    constructor() {
        super();
        this.state = {
            
        };
      }
      render() {
        return (
            <div className="country-container">
                <Link to={"/" + this.props.alpha3Code} ><img className="flag-countries" src={this.props.flag}></img></Link>
                <Link to={"/" + this.props.alpha3Code} ><h3 className="link-country">{this.props.name}</h3></Link>
            </div>
        )
    }
}
