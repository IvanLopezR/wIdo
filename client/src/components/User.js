import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class User extends Component {
    constructor() {
        super();
        this.state = {
            
        };
      }
    render() {
        return (
            <div className="country-container">
                <Link to={"/User/" + this.props._id} ><img className="profile" src={this.props.imgName} alt=""></img></Link>
                <Link to={"/User/" + this.props._id} ><h3 className="link-country username-community">{this.props.username}</h3></Link>
            </div>
        )
    }
}
