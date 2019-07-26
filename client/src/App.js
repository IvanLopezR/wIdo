import React, { Component } from 'react';
import './App.css';
import { Switch, Route, withRouter } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import Community from './components/Community';
import Countries from './components/Countries';
import Friends from './components/Friends';
import Map_Board from './components/Map_Board';
import About_Us from './components/About_Us';
import Invite from './components/Invite';
import Password from './components/Password';
import Edit_Profile from './components/Edit_Profile';
import Selected_Country from './components/Selected_Country';
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
            <Route exact path='/Community' render={() => <Community {...this.state.loggedInUser} logout={this.logout} />} />
            <Route exact path='/Countries' render={() => <Countries {...this.state.loggedInUser} logout={this.logout} />} />
            <Route exact path='/Selected_Country' render={() => <Selected_Country {...this.state.loggedInUser} logout={this.logout} />} />
            <Route exact path='/Friends' render={() => <Friends {...this.state.loggedInUser} logout={this.logout} />} />
            <Route exact path='/Map_Board' render={() => <Map_Board {...this.state.loggedInUser} logout={this.logout} />} />
            <Route exact path='/Edit_Profile' render={() => <Edit_Profile {...this.state.loggedInUser} logout={this.logout} />} />
            <Route exact path='/About_Us' render={() => <About_Us {...this.state.loggedInUser} logout={this.logout} />} />
            <Route exact path='/Invite' render={() => <Invite {...this.state.loggedInUser} logout={this.logout} />} />
            <Route exact path='/Password' render={() => <Password {...this.state.loggedInUser} logout={this.logout} />} />
            <Route exact path='/:chosenCountry' render={(props) => {
                    var chosenCountry = props.match.params.chosenCountry
                    return <Selected_Country coun={chosenCountry}></Selected_Country>
            }}        
            />
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
