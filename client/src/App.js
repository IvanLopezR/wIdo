import React, { Component } from 'react';
import './App.css';
import { Switch, Route, withRouter } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import AuthServices from './Services/Services';

class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedInUser: null,
      google: null
    }
    this.service = new AuthServices();
  }

  componentDidMount() {
      this.service.loggedIn().then((userData) => {
        if (userData) {
          this.setState({
            loggedInUser: userData
          })
        } else {
          this.setState({
            loggedInUser: null
          })
        }
      })
  }

  getTheUser = (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  logout = (event) => {
    // event.preventDefault; 
    this.props.history.push("/login")
    this.service.logout()
      .then(() => {
        this.setState({ loggedInUser: null })
      })
  }

  render() {
    if (this.state.loggedInUser) {
      return (
        <React.Fragment>
          <Switch>
            <Route exact path='/Home' render={() => <Home {...this.state.loggedInUser} logout={this.logout} />} />
            <Route exact path='/Profile' render={() => <Profile {...this.state.loggedInUser} logout={this.logout} />} />
          </Switch>
        </React.Fragment>
      );
    }
    else {
      return (
        <React.Fragment>
          <Route exact path='/signup' render={() => <Signup getUser={this.getTheUser} />} />
          <Route exact path='/login' render={() => <Login getUser={this.getTheUser} userLogged={this.state.loggedInUser} />} />
        </React.Fragment>
      )
    }
  }
}

export default withRouter(App);
