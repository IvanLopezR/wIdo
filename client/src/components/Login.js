import React, { Component } from 'react';
import AuthServices from '../Services/Services';
import { Link, Redirect } from 'react-router-dom';
import logo from '../location-logo.png';
import logowIdo from '../logo-wIdo.png';
// import InstagramLogin from 'react-instagram-login';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '', logged: false, error: null };
    this.service = new AuthServices();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    this.service.login(username, password)
      .then(response => {
        this.setState({ username: "", password: "", logged: true }, () => this.props.getUser(response));
        this.props.getUser(response)
      })
      .catch(error => {
        let errorMsg = error.response.data.message
        this.setState({
          ...this.state,
          error: errorMsg
        })
      })
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    if (this.state.logged) return <Redirect to={"/Home"} />
    return (
      <div className="background">
        <video loop muted autoPlay className="fullscreen-bg__video">
          <source src="./videos/Toronto.mp4" type="video/mp4" />
        </video>
        <div className="logo-container-wIdo">
          <img src={logowIdo} alt="logo wIdo" className="logo-wIdo"></img>
        </div>
        <div className="separate-containers">
          <div className="logo-container">
            <img src={logo} alt="location" className="App-logo"></img>
          </div>
          <div className="login">
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
              </div>
            </form>
            <div className="advise-login msg-err-login">
              {
                this.state.error && <span>{this.state.error}</span>
              }
            </div>
            <div className="advise-login">
              <p className="account-message">Don't have account?
              <Link to={"/signup"}> Create new account</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;
