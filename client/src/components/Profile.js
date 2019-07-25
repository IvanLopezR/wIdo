import React, { Component } from 'react'
import '../sass/main.scss'
import Navbar from './Navbar';
import Footer from './Footer';
import SimpleMap from './Map';

export default class Profile extends Component {

  render() {
    // console.log(process.env.USER)
    return (
      <div className={'background-general background-index-' + Math.floor(Math.random() * 73 + 1)}>
        <Navbar logout={this.props.logout}></Navbar>
        <div className="content-adapt">
          <div className="container-profile">
            <div>
              <a href="/auth/picture"><img className="profile" src={this.props.imgName} alt={this.props.imgName} /></a>
            </div>
            <div className="data-container">
              <h2> <a className="link-profile" href="/auth/profile">{this.props.name}</a> </h2>
              <h4>Username: {this.props.username}</h4>
            </div>
          </div>
          <div className="App">
            <SimpleMap API_KEY='AIzaSyAzGHDso1aXodTgAxYYmuTHdp9iVdxanhM'></SimpleMap>
          </div>
        </div>
        <Footer></Footer>
      </div>
    )
  }
}

