import React, { Component } from 'react';
import Footer from './Footer';
import AuthServices from '../Services/Services';

export default class Invite extends Component {
    constructor() {
        super();
        this.state = {   
            emailFriend:'',
        };
        this.service = new AuthServices();
    }
    handleFormSubmit = (event) => {
        event.preventDefault();
        const emailFriend = this.state.emailFriend;
        this.service.invite(emailFriend)
            .then(response => {
                this.setState({
                    emailFriend: "",
                // }, () => {
                //     this.props.history.push("/login");
                });
                // logged: true }, () => this.props.getUser(response));
                // this.props.getUser(response)
            })
            .catch(error => console.log(error))
    }

    handleChangeEmailFriend = (event) => {
        this.setState({
          emailFriend: event.target.value
        })
      }

    render() {
        return (
            <div className={'background-general background-index-61'}>
                <div className="container-invite">
                    <h2>Invite your friends to join <img src="logo-wido.png" className="img-invite"></img> and discover their favourites world places.</h2>
                    <h3>Share by email:</h3>
                    <form onSubmit={this.handleFormSubmit}>
                        <input type="email" className="input-invite" value={this.state.emailFriend} onChange={e => this.handleChangeEmailFriend(e)} required></input>
                        <button className="btn-invite">Send</button>
                    </form>
                </div>
                <Footer></Footer>
            </div>
        )
    }
}