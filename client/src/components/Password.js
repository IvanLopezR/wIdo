import React, { Component } from 'react';
import Footer from './Footer';
import AuthServices from '../Services/Services';
import { withRouter } from 'react-router-dom';
import { get } from 'https';

class Password extends Component {
    constructor(props) {
        super(props);
        this.state = {
            passwordNew: "",
            passwordNew2: "",
            password: "",
            error: null
        }
        this.errorNews = "Passwords isn't equals.";
        this.errorLast = "Wrong password";
        this.service = new AuthServices();
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const passwordNew = this.state.passwordNew;
        const passwordNew2 = this.state.passwordNew2;
        const password = this.state.password;
        this.service.changePassword(passwordNew, passwordNew2, password)
            .then(response => {
                if (response.errorMessage === this.errorNews) {
                    document.getElementById("passError").innerHTML = this.errorNews;
                    this.setState({
                        ...this.state,
                        password: "",
                        passwordNew: "",
                        passwordNew2: "",
                        error: null
                    })
                }
                else if (response.errorMessage === this.errorLast) {
                    document.getElementById("passError").innerHTML = this.errorLast;
                    this.setState({
                        ...this.state,
                        password: "",
                        passwordNew: "",
                        passwordNew2: "",
                        error: null
                    })
                }
                else {
                    this.setState({
                        password: "",
                        passwordNew: "",
                        passwordNew2: "",
                        error: null
                    })
                    this.props.fetchUser();
                    this.props.history.push('/Profile')
                }

            });
    }

    handleChange = (event) => {
        const { name, value } = event.target;
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
                                        <input id="pass" className="form-control" type="password" placeholder="Password" name="password" id="password" onChange={(e) => this.handleChange(e)} required autoFocus />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password2">New Password: </label>
                                        <input id="newpass" className="form-control" type="password" placeholder="New password" name="passwordNew" id="password2" onChange={(e) => this.handleChange(e)} required />
                                    </div>
                                </div>
                                <div className="separator-data-edit">
                                    <div className="form-group">
                                        <label htmlFor="password3">Repeat New Password: </label>
                                        <input id="newpass2" className="form-control" type="password" placeholder="New password" name="passwordNew2" id="password3" onChange={(e) => this.handleChange(e)} required />
                                    </div>
                                    <button className="btn-edit">Change Password</button>
                                    <div className="msg-err-pass">
                                        <span value="" id="passError">{this.state.error}</span>
                                    </div>
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

export default withRouter(Password)
