import React, { Component } from 'react';
import './App.css';
import { Switch, Route, withRouter } from 'react-router-dom';
import Profile from './components/Profile';
import Signup from './components/Signup';
import Login from './components/Login';
import AuthServices from './Services/Services';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import Axios from 'axios';

const mapStyles = {
  width: '100%',
  height: '100%'
};

class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedInUser: null,
      google: null
    }
    this.service = new AuthServices();
  }

  componentDidMount(){
    this.service.loggedIn().then((userData) => {
      if (userData) {
        this.setState({
          loggedInUser: userData,
          google: "",
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
    // debugger
    if (this.state.loggedInUser) {
      return (
        <React.Fragment>
          <Switch>
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




// export default GoogleApiWrapper({
//   apiKey: 'AIzaSyAzGHDso1aXodTgAxYYmuTHdp9iVdxanhM'
// })(MapContainer);

// export class MapContainer extends Component {
//   render() {
//     return (
//       <Map
//         google={this.props.google}
//         zoom={14}
//         style={mapStyles}
//         initialCenter={{
//          lat: -1.2884,
//          lng: 36.8233
//         }}
//       />
//     );
//   }
// }
