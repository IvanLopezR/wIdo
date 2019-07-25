import React, { Component } from 'react';
import { Link, Redirect , withRouter} from 'react-router-dom';
import AuthServices from '../Services/Services';
import logo from '../location-logo.png';
import logowIdo from '../logo-wIdo.png';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '', name: '', email: '' };
    this.service = new AuthServices();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const name = this.state.name;
    const email = this.state.email
    this.service.signup(username, password, name, email)
      .then(response => {
        this.setState({
          username: "",
          password: "",
          name: "",
          email: "",
        }, () => {
          this.props.history.push("/login");
        });
        // logged: true }, () => this.props.getUser(response));
        // this.props.getUser(response)
      })
      .catch(error => console.log(error))
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }


  render() {
    // if (this.state.logged) return <Redirect to={"/Login"} />
    return (
      <div className="background">
        <video loop muted autoPlay className="fullscreen-bg__video">
          <source src="./videos/NewYork.mp4" type="video/mp4" />
        </video>
        <div className="logo-container-wIdo">
          <img src={logowIdo} alt="logo wIdo" className="logo-wIdo"></img>
        </div>
        <div className="separate-containers">
          <div className="logo-container">
            <img src={logo} alt="location" className="App-logo"></img>
          </div>
          <div className="login">
            <h2 className="sign-text">Sign Up</h2>
            <form onSubmit={this.handleFormSubmit}>
              <div className="username form-group">
                <label htmlFor="username" name="username">User Name</label>
                <input id="username" className="form-control" type="text" name="username" required onChange={e => this.handleChange(e)} />
              </div>
              <div className="pass form-group">
                <label htmlFor="password">Password</label>
                <input id="password" className="form-control" type="password" name="password" required onChange={e => this.handleChange(e)} />
              </div>
              <div className="name form-group">
                <label htmlFor="name" name="name">Name</label>
                <input id="name" className="form-control" type="text" name="name" required  onChange={e => this.handleChange(e)} />
              </div>
              <div className="email form-group">
                <label htmlFor="email" name="email">Email address</label>
                <input id="email" className="form-control" type="email" name="email" required onChange={e => this.handleChange(e)} />
              </div>
              <div className="container-btn-signup">
                <button className="btn-signup">Register</button>
              </div>
            </form>
            <div className="advise-login">
              <p className="account-message">Already have account?
              <Link to={"/login"}> Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Signup)
