import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class User extends Component {
    constructor() {
        super();
        this.state = {
            
        };
      }
    render() {
        console.log(this.props.id)
        return (
            <div className="country-container">
                <Link to={"/user/" + this.props._id} ><img className="profile" src={this.props.imgName} alt=""></img></Link>
                <Link to={"/user/" + this.props._id} ><h3 className="link-country username-community">{this.props.username}</h3></Link>
            </div>
        )
    }
}
