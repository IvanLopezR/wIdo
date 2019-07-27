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
import Navbar from './components/Navbar';
import Invite from './components/Invite';
import Password from './components/Password';
import Picture from './components/Picture';
import Edit_Profile from './components/Edit_Profile';
import Selected_Country from './components/Selected_Country';
import Selected_User from './components/Selected_User';
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
          <Navbar logout={this.logout}></Navbar>
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
            <Route exact path='/Picture' render={() => <Picture {...this.state.loggedInUser} logout={this.logout} />} />
            <Route exact path='/country/:chosenCountry' render={(props) => {
                    var chosenCountry = props.match.params.chosenCountry
                    return <Selected_Country coun={chosenCountry} logout={this.logout}></Selected_Country>
            }}        
            />
            <Route exact path='/user/:chosenUser' render={(props) => {
                    var chosenUser = props.match.params.chosenUser;
                    return <Selected_User us={chosenUser} logout={this.logout}></Selected_User>
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
