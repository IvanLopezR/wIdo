import React, { Component } from 'react';
import Footer from './Footer';
import AuthServices from '../Services/Services';

export default class Password extends Component {
    constructor(props) {
        super(props);
        this.state = {
          passwordNew: "",
          passwordNew2: "",
          password: "",
        }
        this.service = new AuthServices();
      }
    
      handleFormSubmit = (event) => {
        event.preventDefault();
        const passwordNew = this.state.passwordNew;
        const passwordNew2 = this.state.passwordNew2;
        const password = this.state.password;
        this.service.changePassword(passwordNew, passwordNew2, password)
          .then(response => {
            this.setState({
              password: "",
              passwordNew: "",
              passwordNew2: "",
            }, 
            // () => {
            //   this.props.history.push("/login");
            // }
            );
            // logged: true }, () => this.props.getUser(response));
            // this.props.getUser(response)
          })
          .catch(error => console.log(error))
      }
    
      handleChange = (event) => {
        const { name, value } = event.target;
        console.log(name);
        console.log(value);
        this.setState({ [name]: value }
        );
      }

    render() {
        return (
            <div className={'background-general background-index-19'}>
                <div className="content-adapt">
                    <div className="container-edit">
                        <form onSubmit={this.handleFormSubmit}>
                            <div className="wrap-edit-data">
                                <div className="separator-data-edit">
                                    <div className="form-group">
                                        <label htmlFor="password">Current Password: </label>
                                        <input className="form-control" type="password" placeholder="Password" name="password" id="password" onChange={(e) => this.handleChange(e)} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password2">New Password: </label>
                                        <input className="form-control" type="password" placeholder="New password" name="passwordNew" id="password2" onChange={(e) => this.handleChange(e)} required />
                                    </div>
                                </div>
                                <div className="separator-data-edit">
                                    <div className="form-group">
                                        <label htmlFor="password3">Repeat New Password: </label>
                                        <input className="form-control" type="password" placeholder="New password" name="passwordNew2" id="password3" onChange={(e) => this.handleChange(e)} required />
                                    </div>
                                    <button className="btn-edit">Change Password</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        )
    }
}
