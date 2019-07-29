import React, { Component } from 'react';
import AuthServices from '../Services/Services';
import { Link, Redirect } from 'react-router-dom';
import logo from '../location-logo.png';
import logowIdo from '../logo-wIdo.png';

export default class Index extends Component {
  render() {
    return (
      <div className="background">
        <video loop muted autoPlay className="fullscreen-bg__video">
          <source src="./videos/Guanajuato.mp4" type="video/mp4" />
        </video>
        <div className="logo-container-wIdo">
          <img src={logowIdo} alt="logo wIdo" className="logo-wIdo"></img>
        </div>
        <div className="separate-containers">
          <div className="logo-container">
            <img src={logo} alt="location" className="App-logo"></img>
          </div>
          <div className="login">
            <h1 className="sign-text">The Great Social Network of Locations</h1>
            <h3 className="sub-index">Start today and discover the favourite people's places around the world.</h3>
            <p className="index-account-message">Don't have account?
              <Link to={"/signup"}> Create new account</Link>
          </p>
          </div>
          
        </div>
      </div>
    )
  }
}

{/* <div className="login">
            <h2 className="sign-text">Login</h2>
            <form onSubmit={this.handleFormSubmit}>
              <div className="username form-group">
                <label htmlFor="username" name="username">User Name</label>
                <input id="username" className="form-control" type="text" name="username" required value={this.state.username} onChange={e => this.handleChange(e)} />
              </div>
              <div className="pass form-group">
                <label htmlFor="password">Password</label>
                <input id="password" className="form-control" type="password" name="password" required value={this.state.password} onChange={e => this.handleChange(e)} />
              </div>
              <div className="container-btn-signup">
                <button className="btn-signup">Get In</button>
                {/* <InstagramLogin className="login-social"
                  clientId="5fd2f11482844c5eba963747a5f34556"
                  buttonText="Instagram Login"
                  onSuccess={responseInstagram}
                  onFailure={responseInstagram}
                /> */}
          //     </div>
          //   </form>
          //   <div className="advise-login">
          //     <p className="account-message">Don't have account?
          //     <Link to={"/signup"}> Create new account</Link>
          //     </p>
          //   </div>
          // </div> */}